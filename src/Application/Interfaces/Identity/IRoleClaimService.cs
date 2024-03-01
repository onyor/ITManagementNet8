using Ardalis.Result;
using Microsoft.AspNetCore.Mvc;
using ITX.Application.Dtos.Identity;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.Identity;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using Ardalis.Specification;
using System.Linq.Expressions;
using System.Linq;

namespace ITX.Application.Interfaces.Identity
{
    public interface IRoleClaimService
    {

        Task<Result<RoleClaimDto>> GetAsync(Expression<Func<RoleClaim, bool>>? predicate = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes);
        Task<Result<List<RoleClaimDto>>> GetAllAsync(Expression<Func<RoleClaim, bool>>? predicate = null, Func<IQueryable<RoleClaim>, IOrderedQueryable<RoleClaim>>? orderBy =
                                                      null, bool isActive = true, bool isDeleted = false, bool enableTracking = true, bool ignoreState = false, params string[] includes);
        Task<Result<JsonResult>> LoadDataTableAsync(DataTableViewModel vm, Expression<Func<RoleClaim, bool>> predicate = null, Func<IQueryable<RoleClaim>,
                                               IOrderedQueryable<RoleClaim>>? orderBy = null, bool isActive = true, bool isDeleted = false, params string[] includes);
        Task<Result<RoleClaimDto>> AddAsync(RoleClaimDto dto);
        Task<Result<RoleClaimDto>> UpdateAsync(RoleClaimDto dto);
        Task<Result<bool>> DeleteAsync(Expression<Func<RoleClaim, bool>> predicate = null);
    }
}
