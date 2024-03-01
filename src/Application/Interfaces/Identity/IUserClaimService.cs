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
    public interface IUserClaimService
    {

        Task<Result<UserClaimDto>> GetAsync(Expression<Func<UserClaim, bool>>? predicate = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes);
        Task<Result<List<UserClaimDto>>> GetAllAsync(Expression<Func<UserClaim, bool>>? predicate = null, Func<IQueryable<UserClaim>, IOrderedQueryable<UserClaim>>? orderBy =
                                                      null, bool isActive = true, bool isDeleted = false, bool enableTracking = true, bool ignoreState = false, params string[] includes);
        Task<Result<JsonResult>> LoadDataTableAsync(DataTableViewModel vm, Expression<Func<UserClaim, bool>> predicate = null,
                    Func<IQueryable<UserClaim>, IOrderedQueryable<UserClaim>>? orderBy = null, bool isActive = true, bool isDeleted = false, params string[] includes);
        Task<Result<UserClaimDto>> AddAsync(UserClaimDto dto);
        Task<Result<UserClaimDto>> UpdateAsync(UserClaimDto dto);
        Task<Result<bool>> DeleteAsync(Expression<Func<UserClaim, bool>> predicate = null);

    }
}
