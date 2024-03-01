using Ardalis.Result;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ITX.Application.Dtos.Identity;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.Identity;
using ITX.Application.Shared;
using ITX.Application.Specifications;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.Identity;
using ITX.Domain.Shared.Enums;
using ITX.Persistance.Database;
using ITX.Persistance.Database.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ITX.Infrastructure.Data.Services.Identity
{
    public class RoleClaimService : IRoleClaimService
    {
        private readonly ValidatorFactory _validator = new ValidatorFactory();
        protected readonly ITManagementDbContext _context;
        private readonly RoleManager<Role> _roleManager;
        private readonly UserManager<User> _userManager;
        private readonly IJwtService _jwtService;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public RoleClaimService(
            ITManagementDbContext context,
             IUnitOfWork unitOfWork,
            IMapper mapper,
            RoleManager<Role> roleManager,
            UserManager<User> userManager,
            IJwtService jwtService,
            ICurrentUserService currentUserService,
            IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _roleManager = roleManager;
            _userManager = userManager;
            _jwtService = jwtService;
            _currentUserService = currentUserService;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Result<RoleClaimDto>> AddAsync(RoleClaimDto dto)
        {
            try
            {
                var entity = _mapper.Map<RoleClaim>(dto);
                var validator = _validator.CreateValidator<RoleClaim>();
                if (validator != null)
                {
                    var valResult = await validator.ValidateAsync(entity);
                    if (!valResult.IsValid)
                        return Result<RoleClaimDto>.Invalid(valResult.AsErrors());
                }
                _context.Entry(entity).State = EntityState.Added;
                await _context.RoleClaims.AddAsync(entity);

                dto = _mapper.Map<RoleClaimDto>(entity);

                await _context.SaveChangesAsync();
                return Result<RoleClaimDto>.Success(dto);
            }
            catch (Exception ex)
            {
                return Result<RoleClaimDto>.Error(ex.Message);
            }
        }

        public async Task<Result<RoleClaimDto>> UpdateAsync(RoleClaimDto dto)
        {
            try
            {
                var entity = await _context.RoleClaims.FirstOrDefaultAsync(x => x.Id == dto.Id);

                var mapEntity = _mapper.Map(dto, entity);

                _context.Entry(entity).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                var result = _mapper.Map(entity, dto);

                return Result<RoleClaimDto>.Success(result);
            }
            catch (Exception ex)
            {
                return Result<RoleClaimDto>.Error(ex.Message);
            }
        }

        public async Task<Result<bool>> DeleteAsync(Expression<Func<RoleClaim, bool>> predicate = null)
        {
            Result<RoleClaimDto> result = await GetAsync(predicate);

            if (result.IsSuccess && result.Value != null)
            {
                result.Value.IsDeleted = true;
                return (await UpdateAsync(result.Value) != null);
            }
            else
                return Result<bool>.Error("Silme iþlemi sýrasýnda bir hata meydana geldi.");
        }

        // DATA TABLE
        public async Task<Result<JsonResult>> LoadDataTableAsync(DataTableViewModel vm, Expression<Func<RoleClaim, bool>> predicate = null, Func<IQueryable<RoleClaim>, IOrderedQueryable<RoleClaim>>? orderBy = null, bool isActive = true, bool isDeleted = false, params string[] includes)
        {
            try
            {
                IQueryable<RoleClaim> queryable = _context.Set<RoleClaim>();

                if (includes.Length > 0)
                    queryable = queryable.IncludeMultiple(includes);

                queryable = queryable.Where(x => x.IsActive == isActive && x.IsDeleted == isDeleted);

                if (predicate != null)
                    queryable = queryable.Where(predicate);

                if (orderBy != null)
                    queryable = orderBy(queryable);

                var dto = _mapper.Map<List<RoleClaimDto>>(queryable).AsQueryable();

                //Sorting
                if (!string.IsNullOrEmpty(vm.SortColumn) && !string.IsNullOrEmpty(vm.SortColumnDirection))
                    dto = dto.OrderBy($"{vm.SortColumn} {vm.SortColumnDirection}");

                int recordsTotal = dto.Count();
                int recordsFiltered = recordsTotal;

                //Sorting
                if (!string.IsNullOrEmpty(vm.SortColumn) && !string.IsNullOrEmpty(vm.SortColumnDirection))
                {
                    queryable = queryable.OrderBy($"{vm.SortColumn} {vm.SortColumnDirection}");
                }

                //Search
                if (!string.IsNullOrEmpty(vm.SearchValue))
                {
                    queryable = queryable.Where(m =>
                        m.ClaimType.ToLower().Contains(vm.SearchValue.ToLower())
                        );
                    recordsFiltered = dto.Count();
                }

                var data = dto
                 .Skip(vm.Skip)
                 .Take(vm.PageSize)
                 .ToList();

                return new JsonResult(new
                {
                    draw = vm.Draw,
                    recordsFiltered,
                    recordsTotal,
                    data
                });
            }
            catch (Exception ex)
            {
                return Result<JsonResult>.Error(ex.Message);
            }
        }

        public async Task<Result<List<RoleClaimDto>>> GetAllAsync(Expression<Func<RoleClaim, bool>> predicate = null, Func<IQueryable<RoleClaim>, IOrderedQueryable<RoleClaim>> orderBy = null, bool isActive = true, bool isDeleted = false, bool enableTracking = true, bool ignoreState = false, params string[] includes)
        {
            IQueryable<RoleClaim> queryable = _context.Set<RoleClaim>();

            if (!enableTracking) queryable = queryable.AsNoTracking();

            if (includes.Length > 0) queryable = queryable.IncludeMultiple(includes);

            // Dynamic filtering
            if (!ignoreState && typeof(RoleClaim).GetProperty("IsActive") != null && typeof(RoleClaim).GetProperty("IsDeleted") != null)
            {
                queryable = queryable.Where($"IsActive == {isActive} and IsDeleted == {isDeleted}");
            }

            // Ekstra filtreleme
            if (predicate != null) queryable = queryable.Where(predicate);

            if (orderBy != null)
            {
                var entity = await orderBy(queryable).ToListAsync();

                return Result<List<RoleClaimDto>>.Success(_mapper.Map<List<RoleClaimDto>>(entity));
            }

            return Result<List<RoleClaimDto>>.Success(_mapper.Map<List<RoleClaimDto>>(await queryable.ToListAsync()));
        }

        public async Task<Result<RoleClaimDto>> GetAsync(Expression<Func<RoleClaim, bool>> predicate = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes)
        {
            IQueryable<RoleClaim> queryable = _context.Set<RoleClaim>();

            if (includes.Length > 0) queryable = queryable.IncludeMultiple(includes);

            if (predicate != null) queryable = queryable.Where(predicate);

            // Dynamic filtering
            if (!ignoreState && typeof(RoleClaim).GetProperty("IsActive") != null && typeof(RoleClaim).GetProperty("IsDeleted") != null)
            {
                queryable = queryable.Where($"IsActive == {isActive} and IsDeleted == {isDeleted}");
            }

            return Result<RoleClaimDto>.Success(_mapper.Map<RoleClaimDto>(await queryable.FirstOrDefaultAsync()));
        }
    }
}
