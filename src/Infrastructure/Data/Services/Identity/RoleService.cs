using Ardalis.Result;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ITX.Application.Dtos.Identity;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.Identity;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.Identity;
using ITX.Persistance.Database.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ITX.Infrastructure.Data.Services.Identity
{
    public class RoleService : IRoleService
    {
        private readonly ITManagementDbContext _context;
        private readonly RoleManager<Role> _roleManager;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public RoleService(
            ITManagementDbContext context,
            RoleManager<Role> roleManager,
            ICurrentUserService currentUserService,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _roleManager = roleManager;
            _currentUserService = currentUserService;
            _httpContextAccessor = httpContextAccessor;
        }


        public async Task<Result<RoleDto>> AddAsync(RoleDto dto)
        {
            var role = _mapper.Map<Role>(dto);

            role.CreatedAt = DateTime.Now;
            role.CreatedBy = Guid.Parse(_currentUserService.GetUserId());
            role.IsActive = true;
            var result = await _roleManager.CreateAsync(role);
            if (!result.Succeeded)
            {
                return Result<RoleDto>.Invalid(result.Errors.Select(x => new ValidationError
                {
                    Identifier = dto.Name,
                    ErrorMessage = x.Description,
                }).ToList());
            }

            return Result<RoleDto>.Success(_mapper.Map<RoleDto>(role));
        }

        public async Task<Result<RoleDto>> UpdateAsync(RoleDto dto)
        {
            var role = _mapper.Map<Role>(dto);

            var roleToUpdate = await _roleManager.FindByIdAsync(role.Id.ToString());
            if (roleToUpdate.Name != "Admin")
            {
                roleToUpdate.Name = role.Name;
            }
            roleToUpdate.Description = role.Description;
            role.UpdatedAt = DateTime.Now;
            role.UpdatedBy = Guid.Parse(_currentUserService.GetUserId());

            var updateResult = await _roleManager.UpdateAsync(roleToUpdate);
            if (!updateResult.Succeeded)
            {
                return Result<RoleDto>.Invalid(updateResult.Errors.Select(x => new ValidationError
                {
                    Identifier = dto.Name,
                    ErrorMessage = x.Description,
                }).ToList());
            }

            var roleInDb = await _roleManager.FindByIdAsync(role.Id.ToString());

            return Result<RoleDto>.Success(_mapper.Map<RoleDto>(roleInDb));
        }

        public async Task<Result<bool>> DeleteAsync(Expression<Func<Role, bool>> predicate = null)
        {
            var role = await _context.Roles.SingleOrDefaultAsync(predicate);
            //role.IsDeleted = true; // SOFT DELETE
            _context.Roles.Remove(role); // REAL DELETE
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task<Result<RoleDto>> GetAsync(Expression<Func<Role, bool>>? predicate = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes)
        {
            var role = await _context.Roles
                .SingleOrDefaultAsync(predicate);

            return _mapper.Map<RoleDto>(role);
        }

        public async Task<Result<List<RoleDto>>> GetAllAsync(Expression<Func<Role, bool>>? predicate = null, Func<IQueryable<Role>, IOrderedQueryable<Role>>? orderBy =
                                                      null, bool isActive = true, bool isDeleted = false, bool enableTracking = true, bool ignoreState = false, params string[] includes)
        {
            var roles = await _context.Roles.Where(x => !x.IsDeleted).ToListAsync();

            bool isAdmin = _httpContextAccessor.HttpContext?.User?.Claims.Any(c => c.Type == ClaimTypes.Role && c.Value == "Admin") ?? false;

            if (!isAdmin)
            {
                roles = await _context.Roles.Where(x => !x.Name.Equals("Admin") && !x.IsDeleted).ToListAsync();
            }
            return _mapper.Map<List<RoleDto>>(roles);
        }


        public async Task<Result<JsonResult>> LoadDataTableAsync(DataTableViewModel vm, Expression<Func<Role, bool>> predicate = null, Func<IQueryable<Role>, IOrderedQueryable<Role>>? orderBy = null, bool isActive = true, bool isDeleted = false, params string[] includes)
        {
            try
            {

                int recordsTotal = _context.Roles.Where(x => !x.IsDeleted).Count();
                int recordsFiltered = recordsTotal;

                var roleInfo = _context.Roles.Where(x => !x.IsDeleted);

                var roleData = roleInfo.Select(tempRole => new
                {
                    tempRole.Id,
                    tempRole.Name,
                    tempRole.Description
                });

                //Sorting
                if (!string.IsNullOrEmpty(vm.SortColumn) && !string.IsNullOrEmpty(vm.SortColumnDirection))
                {
                    roleData = roleData.OrderBy($"{vm.SortColumn} {vm.SortColumnDirection}");
                }

                //Search
                if (!string.IsNullOrEmpty(vm.SearchValue))
                {
                    roleData = roleData.Where(m =>
                        m.Name.ToLower().Contains(vm.SearchValue.ToLower()) ||
                        m.Description.ToLower().Contains(vm.SearchValue.ToLower()));
                    recordsFiltered = roleData.Count();
                }

                var result = roleData.Skip(vm.Skip).Take(vm.PageSize).ToList();

                return new JsonResult(new
                {
                    draw = vm.Draw,
                    recordsFiltered = recordsFiltered,
                    recordsTotal = recordsTotal,
                    data = result
                });
            }
            catch (Exception ex)
            {
                return Result<JsonResult>.Error(ex.Message);
            }
        }

        public async Task<Guid> GetDefaultClientUserIdAsync()
        {
            var role = _context.UserRoles.Include(x => x.Role).FirstOrDefault(x => x.Role.Name.ToLower() == "danışan");

            var roleId = role.UserId;
            if (roleId != Guid.Empty)
                return roleId;
            else
                return Guid.Empty;
        }
    }
}
