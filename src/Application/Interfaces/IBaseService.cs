using Ardalis.Result;
using Microsoft.AspNetCore.Mvc;
using ITX.Application.Dtos;
using ITX.Application.ViewModels;
using ITX.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ITX.Application.Interfaces
{
    public interface IBaseService<TEntity, TEntityDto>
        where TEntity : BaseEntity<long>, new()
        where TEntityDto : BaseDto<long>, new()
    {
        Task<Result<TEntityDto>> GetAsync(Expression<Func<TEntity, bool>>? predicate = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes);
        Task<Result<List<TEntityDto>>> GetAllAsync(Expression<Func<TEntity, bool>>? predicate = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy =
                                                      null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes);
        Task<Result<JsonResult>> LoadDataTableAsync(DataTableViewModel vm, Expression<Func<TEntity, bool>> predicate = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null, bool isActive = true, bool isDeleted = false, params string[] includes);
        Task<Result<TEntityDto>> AddAsync(TEntityDto entityDto);
        Task<Result<TEntityDto>> UpdateAsync(TEntityDto entityDto);
        Task<Result<bool>> DeleteAsync(Expression<Func<TEntity, bool>> predicate = null);

        Task<Result<object>> GetFilteredProjectionAsync(Expression<Func<TEntity, bool>>? predicate = null, Expression<Func<TEntity, object>>? selector = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes);

        Task<Result<object>> GetAllFilteredProjectionAsync(Expression<Func<TEntity, bool>>? predicate = null, Expression<Func<TEntity, object>>? selector = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes);

        Task<Result<List<TEntityDto>>> UpdateOrAddEntitiesAsync(
            Expression<Func<TEntity, bool>> filter,
            List<long> ids,
            Func<long, TEntityDto> createNewEntity,
            Func<TEntity, long> getIdFromEntity);
    }
}
