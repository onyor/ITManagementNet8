using Ardalis.Result;
using Microsoft.AspNetCore.Mvc;
using ITX.Application.Dtos.Identity;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ITX.Application.Interfaces.Identity
{
    public interface IRoleService
    {

        Task<Result<RoleDto>> AddAsync(RoleDto dto);
        Task<Result<RoleDto>> UpdateAsync(RoleDto dto);
        Task<Result<bool>> DeleteAsync(Expression<Func<Role, bool>> predicate = null);
        Task<Result<RoleDto>> GetAsync(Expression<Func<Role, bool>>? predicate = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes);
        Task<Result<List<RoleDto>>> GetAllAsync(Expression<Func<Role, bool>>? predicate = null, Func<IQueryable<Role>, IOrderedQueryable<Role>>? orderBy =
                                                      null, bool isActive = true, bool isDeleted = false, bool enableTracking = true, bool ignoreState = false, params string[] includes);
        Task<Result<JsonResult>> LoadDataTableAsync(DataTableViewModel vm, Expression<Func<Role, bool>> predicate = null, Func<IQueryable<Role>,
                                               IOrderedQueryable<Role>>? orderBy = null, bool isActive = true, bool isDeleted = false, params string[] includes);


        //Task<RoleDto> GetAsync(Guid id, bool isDeleted = false)
        //Task<Result<RoleDto>> AddAsync(RoleDto dto);
        //Task<Result<RoleDto>> UpdateAsync(RoleDto dto);
        //Task DeleteAsync(Guid roleId);
        //JsonResult FillDataTable(DataTableViewModel vm);
        Task<Guid> GetDefaultClientUserIdAsync();

        // DATA TABLE
    }
}
