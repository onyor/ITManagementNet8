using Ardalis.Result;
using AutoMapper;
using DevExpress.Data.ODataLinq.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ITX.Application.Dtos.Identity;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.Identity;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.LogManagement;
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
    public class UserService : IUserService
    {
        protected readonly ITManagementDbContext _context;
        private readonly RoleManager<Role> _roleManager;
        private readonly UserManager<User> _userManager;
        private readonly IJwtService _jwtService;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserService(
            ITManagementDbContext context,
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

        public async Task<Result<UserDto>> AddAsync(UserDto dto, string password, string rolAd)
        {
            int length = dto.Password == null ? 0 : dto.Password.Length;
            if (dto.Email == "admin@itx.gov.tr" && length < 8)
            {
                return Result<UserDto>.Error("Şifre 8 karakterden büyük olmalı.");
            }
            else
            {
                if (await _userManager.FindByEmailAsync(dto.Email) != null)
                {
                    return Result<UserDto>.Invalid(new List<ValidationError>
                {
                    new ValidationError
                    {
                        Identifier = nameof(dto.Email),
                        ErrorMessage = $"Email {dto.Email} is in use!",
                    }
                });
                }

                var user = _mapper.Map<User>(dto);
                user.Email = dto.Email.ToLower();
                user.UserName = dto.Email.ToLower();
                user.CreatedAt = DateTime.Now;
                user.CreatedBy = Guid.Parse(_currentUserService.GetUserId());
                user.IsActive = true;

                foreach (var userRole in user.UserRoles)
                {
                    userRole.IsActive = true;
                    userRole.CreatedAt = DateTime.Now;
                    userRole.CreatedBy = Guid.Parse(_currentUserService.GetUserId());

                    if (!string.IsNullOrEmpty(rolAd))
                    {
                        var rol = await _context.Roles.Where(x => x.Name == rolAd).FirstOrDefaultAsync();
                        userRole.RoleId = rol.Id;
                    }
                }

                var result = await _userManager.CreateAsync(user, password);

                if (!result.Succeeded)
                {
                    return Result<UserDto>.Invalid(result.Errors.Select(x => new ValidationError
                    {
                        Identifier = x.Code,
                        ErrorMessage = x.Description,
                    }).ToList());
                }

                return Result<UserDto>.Success(_mapper.Map<UserDto>(user));
            }
        }

        public async Task<Result<UserDto>> UpdateAsync(UserDto dto, string password)
        {
            try
            {
                int passLength = dto.Password == null ? 0 : dto.Password.Length;
                bool isAdmin = _httpContextAccessor.HttpContext?.User?.Claims.Any(c => c.Type == ClaimTypes.Role && c.Value == "Admin") ?? false;
                //if (length < 8)
                //    return Result<UserDto>.Error("Şifre 8 karakterden büyük olmalı.");
                if (passLength > 0)
                {

                    bool hasUpperCase = false;
                    bool hasLowerCase = false;

                    foreach (char c in password)
                    {
                        if (char.IsUpper(c))
                        {
                            hasUpperCase = true;
                        }
                        else if (char.IsLower(c))
                        {
                            hasLowerCase = true;
                        }

                        if (hasUpperCase && hasLowerCase)
                        {
                            break;
                        }
                    }

                    if (!hasUpperCase || !hasLowerCase)
                    {
                        return Result<UserDto>.Error("Şifre hem büyük hem de küçük harf içermelidir.");
                    }
                }

                var oldUser = await _context.Users
                                        .Include(x => x.UserRoles)
                                        .SingleOrDefaultAsync(x => x.Id == dto.Id);

                var dateTimeNow = DateTime.Now;

                // UPDATE ROLES
                var oldRoleIds = oldUser.UserRoles.Select(x => x.RoleId).ToList();
                var newRoleIds = dto.UserRoles.Select(x => x.RoleId).ToList();

                var roleIdsToAdd = newRoleIds.Except(oldRoleIds);
                foreach (var roleId in roleIdsToAdd)
                {
                    oldUser.UserRoles.Add(new UserRole
                    {
                        UserId = dto.Id,
                        RoleId = roleId,
                        IsActive = true,
                        IsDeleted = false,
                        CreatedAt = dateTimeNow
                    });
                }

                var roleIdsToRemove = oldRoleIds.Except(newRoleIds);
                foreach (var roleId in roleIdsToRemove)
                {
                    var userRole = oldUser.UserRoles.FirstOrDefault(x => x.RoleId == roleId);
                    if (userRole != null)
                        if (isAdmin)
                            oldUser.UserRoles.Remove(userRole);
                        else
                            if (roleId != Guid.Parse("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"))
                            oldUser.UserRoles.Remove(userRole);


                }

                oldUser.Name = dto.Name;
                oldUser.Surname = dto.Surname;
                oldUser.UserName = dto.UserName;
                oldUser.Title = dto.Title;
                oldUser.Email = dto.Email.ToLower();
                oldUser.PhoneNumber = dto.PhoneNumber;
                oldUser.IsActive = dto.IsActive;
                oldUser.UpdatedAt = dateTimeNow;
                oldUser.UpdatedBy = Guid.Parse(_currentUserService.GetUserId());

                // RESET PASSWORD
                if (!string.IsNullOrEmpty(password))
                {
                    await _userManager.UpdateSecurityStampAsync(oldUser);

                    var token = await _userManager.GeneratePasswordResetTokenAsync(oldUser);
                    var verifyResult = await _userManager.VerifyUserTokenAsync(oldUser,
                        _userManager.Options.Tokens.PasswordResetTokenProvider,
                        UserManager<User>.ResetPasswordTokenPurpose, token);
                    var resetResult = await _userManager.ResetPasswordAsync(oldUser, token, password);
                }

                await _context.SaveChangesAsync();

                return Result<UserDto>.Success(_mapper.Map<UserDto>(oldUser));

            }
            catch (Exception ex)
            {

                return Result<UserDto>.Error(ex.ToString());
            }
        }

        public async Task<Result<UserDto>> UpdateNoPassAsync(UserDto dto)
        {
            try
            {
                var oldUser = await _context.Users
                                        .Include(x => x.UserRoles)
                                        .SingleOrDefaultAsync(x => x.Id == dto.Id);

                oldUser.Name = dto.Name;
                oldUser.Surname = dto.Surname;
                oldUser.Title = dto.Title;
                oldUser.Email = dto.Email.ToLower();
                oldUser.PhoneNumber = dto.PhoneNumber;
                oldUser.UpdatedAt = DateTime.Now;
                oldUser.UpdatedBy = Guid.Parse(_currentUserService.GetUserId());

                // RESET PASSWORD
                //if (!string.IsNullOrEmpty(password))
                //{
                //    await _userManager.UpdateSecurityStampAsync(oldUser);

                //    var token = await _userManager.GeneratePasswordResetTokenAsync(oldUser);
                //    var verifyResult = await _userManager.VerifyUserTokenAsync(oldUser,
                //        _userManager.Options.Tokens.PasswordResetTokenProvider,
                //        UserManager<User>.ResetPasswordTokenPurpose, token);
                //    var resetResult = await _userManager.ResetPasswordAsync(oldUser, token, password);
                //}

                await _context.SaveChangesAsync();

                return Result<UserDto>.Success(_mapper.Map<UserDto>(oldUser));

            }
            catch (Exception ex)
            {

                return Result<UserDto>.Error(ex.ToString());
            }
        }

        // DATA TABLE
        public async Task<Result<JsonResult>> LoadDataTableAsync(DataTableViewModel vm, Expression<Func<User, bool>> predicate = null, Func<IQueryable<User>,
                                               IOrderedQueryable<User>>? orderBy = null, bool isActive = true, bool isDeleted = false, params string[] includes)
        {
            try
            {
                bool isAdmin = _httpContextAccessor.HttpContext?.User?.Claims.Any(c => c.Type == ClaimTypes.Role && c.Value == "Admin") ?? false;

                var info = _context.Users
                   .Include(x => x.UserRoles.Where(x => !x.IsDeleted && !x.Role.IsDeleted))
                           .ThenInclude(y => y.Role)
                            .Where(x => (!isAdmin ? x.UserRoles.Any(z => z.RoleId != Guid.Parse("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e") && z.RoleId != Guid.Parse("c327c1ec-2623-4832-735f-08db99945c21")) &&
                            !x.IsDeleted && x.IsActive == isActive : !x.IsDeleted && x.IsActive == isActive));


                var query = info.Select(tempUser => new
                {
                    tempUser.Id,
                    tempUser.Name,
                    tempUser.Surname,
                    tempUser.UserName,
                    tempUser.Email,
                    tempUser.PhoneNumber,
                    tempUser.Title,
                    RoleNames = string.Join(", ", tempUser.UserRoles
                        .Where(x => !x.IsDeleted && !x.Role.IsDeleted)
                        .Select(x => x.Role.Name))
                });

                int recordsTotal = query.Count();
                int recordsFiltered = recordsTotal;

                //Sorting
                if (!string.IsNullOrEmpty(vm.SortColumn) && !string.IsNullOrEmpty(vm.SortColumnDirection))
                {
                    query = query.OrderBy($"{vm.SortColumn} {vm.SortColumnDirection}");
                }

                //Search
                if (!string.IsNullOrEmpty(vm.SearchValue))
                {
                    query = query.Where(m =>
                        (m.Name.ToLower() + " " + m.Surname.ToLower()).Contains(vm.SearchValue.ToLower()) ||
                        m.Name.ToLower().Contains(vm.SearchValue.ToLower()) ||
                        m.Surname.ToLower().Contains(vm.SearchValue.ToLower()) ||
                        m.Email.ToLower().Contains(vm.SearchValue.ToLower())
                        //m.RoleNames.ToLower().Contains(vm.SearchValue.ToLower())
                        );

                    recordsFiltered = query.Count();
                }



                var data = query.Skip(vm.Skip).Take(vm.PageSize).ToList();

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
                throw ex;
            }
        }

        public async Task<Result<List<UserDto>>> GetAllAsync(Expression<Func<User, bool>>? predicate = null, Func<IQueryable<User>, IOrderedQueryable<User>>? orderBy =
                                                      null, bool isActive = true, bool isDeleted = false, bool enableTracking = true, bool ignoreState = false, params string[] includes)
        {
            var users = await _context.Users.Where(x => !x.IsDeleted).ToListAsync();

            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<Result<UserDto>> GetAsync(Expression<Func<User, bool>>? predicate = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes)
        {
            var user = await _context.Users
                .Include(x => x.UserRoles.Where(x => !x.IsDeleted && !x.Role.IsDeleted))
                    .ThenInclude(y => y.Role)
                .Include(x => x.CurrentRole)
                .FirstOrDefaultAsync(predicate);

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> GetByEmailAsync(string email)
        {
            try
            {

                UserDto userDto = new UserDto();
                var user = await _context.Users
                    .Include(x => x.UserRoles.Where(x => !x.IsDeleted && !x.Role.IsDeleted))
                        .ThenInclude(y => y.Role)
                    .Include(x => x.CurrentRole)
                    .FirstOrDefaultAsync(x => x.Email.ToLower() == email.ToLower() && !x.IsDeleted);

                if (user != null)
                {
                    userDto = _mapper.Map<UserDto>(user);
                }

                return userDto;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<UserDto> GetByUserNameAsync(string userName)
        {
            try
            {

                UserDto userDto = new UserDto();
                var user = await _context.Users
                    .Include(x => x.UserRoles.Where(x => !x.IsDeleted && !x.Role.IsDeleted))
                        .ThenInclude(y => y.Role)
                    .Include(x => x.CurrentRole)
                    .FirstOrDefaultAsync(x => x.UserName.ToLower() == userName.ToLower() && !x.IsDeleted && x.IsActive);

                if (user != null)
                {
                    userDto = _mapper.Map<UserDto>(user);
                }

                return userDto;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Result<bool>> DeleteAsync(Expression<Func<User, bool>> predicate = null)
        {
            var user = await _context.Users.SingleOrDefaultAsync(predicate);
            user.IsDeleted = true;
            return (await _context.SaveChangesAsync()) > 0;

        }

        public async Task UpdateCurrentRoleAsync(Guid userId, Guid roleId)
        {
            var user = await _context.Users.FindAsync(userId);
            user.CurrentRoleId = roleId;
            user.UpdatedAt = DateTime.Now;
            user.UpdatedBy = Guid.Parse(_currentUserService.GetUserId());

            await _context.SaveChangesAsync();
        }

        public async Task LogUserAction(Guid userId, string action, string onBehalf = null)
        {
            try
            {
                _context.AuditLogs.Add(new AuditLog()
                {
                    UserId = userId,
                    Type = action,
                    CreatedAt = DateTime.Now,
                    TableName = onBehalf
                });

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        //public async Task dummy()
        //{
        //    try
        //    {
        //        var advisorDorms = _context.AdvisorDorms.Include(x => x.AdvisorDefinition).ToList();
        //        var avail = _context.AdvisorAvailabilitys.ToList();
        //        var advisorre = _context.RequestTypeAdvisorDefinitions.ToList();
        //        foreach (var advisorDorm in advisorDorms)
        //        {
        //            foreach (var item in avail)
        //            {
        //                var ava = new AdvisorAvailability();
        //                ava.AdvisorDefinitionId = advisorDorm.AdvisorDefinitionId;
        //                ava.DormId = advisorDorm.DormId;
        //                ava.SessionId = item.SessionId;
        //                ava.DayOfWeek = item.DayOfWeek;
        //                ava.AppointmentTypeId = item.AppointmentTypeId;
        //                ava.RequestTypeId = advisorre.Where(x => x.AdvisorDefinitionId == item.AdvisorDefinitionId).Select(x => x.RequestTypeId).FirstOrDefault();

        //                await _context.AdvisorAvailabilitys.AddAsync(ava);

        //            }
        //        }

        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        System.IO.File.WriteAllText(@"C:\tmp\log.txt", ex.InnerException.ToString());
        //        throw ex;
        //    }

        //}

        // default role is assigned
        public async Task<Result<UserDto>> BuildUserDtoAsync(Guid userId, string CitizenNo, string DormServiceCode, string ShowRequestTypeGroups)
        {
            try
            {
                var user = await _context.Users
                .Include(x => x.UserRoles.Where(x => !x.IsDeleted && !x.Role.IsDeleted))
                    .ThenInclude(y => y.Role)
                    .ThenInclude(y => y.RoleClaims)
                .Include(x => x.UserClaims.Where(x => !x.IsDeleted && !x.User.IsDeleted))
                .Include(x => x.CurrentRole)
                .FirstOrDefaultAsync(x => x.Id == userId && x.IsDeleted == false);

                if (user == null)
                {
                    return Result<UserDto>.NotFound();
                }

                var userRoles = user.UserRoles.Where(x => !x.IsDeleted).Select(ur => new UserRoleDto
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    RoleId = ur.RoleId,
                    RoleName = ur.Role.Name
                }).ToList();

                var userClaims = _mapper.Map<List<UserClaimDto>>(user.UserClaims.Where(x => !x.IsDeleted).ToList());

                var roleClaims = _mapper.Map<List<RoleClaimDto>>(await _context.UserRoles
                        .Where(ur => ur.UserId == userId && !ur.IsDeleted && !ur.Role.IsDeleted)
                        .SelectMany(ur => ur.Role.RoleClaims)
                        .Where(rc => !rc.IsDeleted).ToListAsync());

                var newUserDto = new UserDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Surname = user.Surname,
                    Title = user.Title,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    ExpirationMinutes = _jwtService.GetMinutes,
                    UserRoles = userRoles,
                    RoleClaims = roleClaims,
                    UserClaims = userClaims,
                    CurrentRoleId = user.CurrentRoleId ?? userRoles.Select(x => x.RoleId).First(),
                    CurrentRoleName = user.CurrentRole?.Name ?? userRoles.Select(x => x.RoleName).First(),
                    ShowRequestTypeGroups = ShowRequestTypeGroups,

                };
                newUserDto.Token = _jwtService.CreateToken(newUserDto);

                return Result<UserDto>.Success(newUserDto);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
