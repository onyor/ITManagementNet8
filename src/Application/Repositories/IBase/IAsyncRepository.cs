using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;


namespace ITX.Application.Repositories.IBase;

public interface IAsyncRepository<T> : IQuery<T> where T : class, new()
{
    Task<T?> GetAsync(Expression<Func<T, bool>>? predicate = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes);
    Task<IList<T>> GetAllAsync(Expression<Func<T, bool>> predicate = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
                                                  int index = 0, int size = 10, bool enableTracking = true,
                                                   bool isActive = true, bool isDeleted = false, bool ignoreState = false,
                                                   CancellationToken cancellationToken = default, params string[] includes
                                                 );

    Task<T> AddAsync(T entity);
    Task<T> UpdateAsync(T entity);
    Task<bool> DeleteAsync(Expression<Func<T, bool>> predicate);
    Task<T> AddAndSaveAsync(T entity);
    Task<T> UpdateAndSaveAsync(T entity);
    Task<bool> AnyAsync(Expression<Func<T, bool>> predicate, params string[] includes);
    Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null);
    Task<decimal> MaxAsync(Expression<Func<T, decimal>> selector, Expression<Func<T, bool>>? predicate = null);
    Task<decimal> MinAsync(Expression<Func<T, decimal>> selector, Expression<Func<T, bool>>? predicate = null);
    Task<decimal> SumAsync(Expression<Func<T, decimal>> selector, Expression<Func<T, bool>>? predicate = null);
    Task<IList<T>> Distinct(Expression<Func<T, object>> selector);


    Task<object?> GetFilteredProjectionAsync(Expression<Func<T, bool>>? predicate = null, Expression<Func<T, object>>? selector = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes);
    Task<IList<object>> GetAllFilteredProjectionAsync(Expression<Func<T, bool>> predicate = null, Expression<Func<T, object>>? selector = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
                                                  int index = 0, int size = 10, bool enableTracking = true,
                                                   bool isActive = true, bool isDeleted = false, bool ignoreState = false,
                                                   CancellationToken cancellationToken = default, params string[] includes
                                                 );

}