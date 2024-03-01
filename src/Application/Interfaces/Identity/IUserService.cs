using Ardalis.Result;
using Microsoft.AspNetCore.Mvc;
using ITX.Application.Dtos.Identity;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Linq;
using System.Threading.Tasks;

namespace ITX.Application.Interfaces.Identity
{
    public interface IUserService
    {
        Task<Result<UserDto>> AddAsync(UserDto dto, string password, string rolAd);
        Task<Result<UserDto>> UpdateAsync(UserDto dto, string password);
        Task<Result<UserDto>> UpdateNoPassAsync(UserDto dto);
        Task<Result<bool>> DeleteAsync(Expression<Func<User, bool>> predicate = null);
        Task<Result<UserDto>> BuildUserDtoAsync(Guid userId, string CitizenNo, string DormServiceCode, string ShowRequestTypeGroups);

        // Update UI Settings
        Task UpdateCurrentRoleAsync(Guid userId, Guid roleId);

        Task<Result<List<UserDto>>> GetAllAsync(Expression<Func<User, bool>>? predicate = null, Func<IQueryable<User>, IOrderedQueryable<User>>? orderBy =
                                                      null, bool isActive = true, bool isDeleted = false, bool enableTracking = true, bool ignoreState = false, params string[] includes);
        Task<Result<UserDto>> GetAsync(Expression<Func<User, bool>>? predicate = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes);
        Task<UserDto> GetByEmailAsync(string email);
        Task<UserDto> GetByUserNameAsync(string userName);

        // DATA TABLE
        Task<Result<JsonResult>> LoadDataTableAsync(DataTableViewModel vm, Expression<Func<User, bool>> predicate = null, Func<IQueryable<User>,
                                               IOrderedQueryable<User>>? orderBy = null, bool isActive = true, bool isDeleted = false, params string[] includes);

        // AuditLog user actions: logins and logouts
        Task LogUserAction(Guid userId, string action, string onBehalf = null);
    }
}
