
using Microsoft.EntityFrameworkCore;
using ITX.Application.Repositories.IBase;
using ITX.Persistance.Database.Context;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;


namespace ITX.Persistance.Database.Base;
public class EfRepositoryBase<TEntity> : IAsyncRepository<TEntity>
    where TEntity : class, new()
{
    protected ITManagementDbContext Context { get; }


    public EfRepositoryBase(ITManagementDbContext context)
    {
        Context = context;
    }

    public IQueryable<TEntity> Query()
    {
        return Context.Set<TEntity>();
    }

    public async Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>>? predicate = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes)
    {
        IQueryable<TEntity> queryable = Query();

        if (includes.Length > 0) queryable = queryable.IncludeMultiple(includes);

        if (predicate != null) queryable = queryable.Where(predicate);

        // Dynamic filtering
        if (!ignoreState && typeof(TEntity).GetProperty("IsActive") != null && typeof(TEntity).GetProperty("IsDeleted") != null)
        {
            queryable = queryable.Where($"IsActive == {isActive} and IsDeleted == {isDeleted}");
        }

        return await queryable.FirstOrDefaultAsync();
    }

    public async Task<IList<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>>? predicate = null,
                                              Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
                                              int index = 0, int size = 10, bool enableTracking = true,
                                              bool isActive = true, bool isDeleted = false, bool ignoreState = false,
                                              CancellationToken cancellationToken = default, params string[] includes)
    {
        IQueryable<TEntity> queryable = Query();

        if (!enableTracking) queryable = queryable.AsNoTracking();

        if (includes.Length > 0) queryable = queryable.IncludeMultiple(includes);

        // Dynamic filtering
        if (!ignoreState && typeof(TEntity).GetProperty("IsActive") != null && typeof(TEntity).GetProperty("IsDeleted") != null)
        {
            queryable = queryable.Where($"IsActive == {isActive} and IsDeleted == {isDeleted}");
        }

        // Ekstra filtreleme
        if (predicate != null) queryable = queryable.Where(predicate);

        if (orderBy != null)
            return await orderBy(queryable).ToListAsync();
        return await queryable.ToListAsync();
    }

    public async Task<TEntity> AddAsync(TEntity entity)
    {
        Context.Entry(entity).State = EntityState.Added;
        return entity;
    }

    public async Task<TEntity> UpdateAsync(TEntity entity)
    {
        Context.Entry(entity).State = EntityState.Modified;
        return entity;
    }


    public async Task<TEntity> AddAndSaveAsync(TEntity entity)
    {
        Context.Entry(entity).State = EntityState.Added;
        await Context.SaveChangesAsync();
        return entity;
    }


    public async Task<TEntity> UpdateAndSaveAsync(TEntity entity)
    {
        Context.Entry(entity).State = EntityState.Modified;
        await Context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteAsync(Expression<Func<TEntity, bool>> predicate)
    {
        var entity = await Context.Set<TEntity>().FirstOrDefaultAsync(predicate);
        if (entity == null)
        {
            throw new Exception("Entity not found");
        }

        // Assuming TEntity has a property named "IsDeleted"
        var property = typeof(TEntity).GetProperty("IsDeleted");
        if (property == null)
        {
            throw new Exception("IsDeleted property not found on type " + typeof(TEntity).Name);
        }

        property.SetValue(entity, true);
        return (await UpdateAndSaveAsync(entity) != null);
    }


    public async Task<bool> AnyAsync(Expression<Func<TEntity, bool>> predicate, params string[] includes)
    {
        IQueryable<TEntity> queryable = Query();

        if (includes.Length > 0) queryable = queryable.IncludeMultiple(includes);

        if (predicate != null)
        {
            queryable = queryable.Where(predicate);
        }

        return await queryable.AnyAsync();
    }

    public async Task<int> CountAsync(Expression<Func<TEntity, bool>>? predicate = null)
    {
        IQueryable<TEntity> queryable = Query();

        if (predicate != null)
        {
            queryable = queryable.Where(predicate);
        }

        return await queryable.CountAsync();
    }

    public async Task<decimal> SumAsync(Expression<Func<TEntity, decimal>> selector, Expression<Func<TEntity, bool>>? predicate = null)
    {
        IQueryable<TEntity> queryable = Query();

        if (predicate != null)
        {
            queryable = queryable.Where(predicate);
        }

        return await queryable.SumAsync(selector);
    }

    public async Task<decimal> MinAsync(Expression<Func<TEntity, decimal>> selector, Expression<Func<TEntity, bool>>? predicate = null)
    {
        IQueryable<TEntity> queryable = Query();

        if (predicate != null)
        {
            queryable = queryable.Where(predicate);
        }

        return await queryable.MinAsync(selector);
    }

    public async Task<decimal> MaxAsync(Expression<Func<TEntity, decimal>> selector, Expression<Func<TEntity, bool>>? predicate = null)
    {
        IQueryable<TEntity> queryable = Query();

        if (predicate != null)
        {
            queryable = queryable.Where(predicate);
        }

        return await queryable.MaxAsync(selector);
    }

    public async Task<IList<TEntity>> Distinct(Expression<Func<TEntity, object>> selector)
    {
        IQueryable<TEntity> queryable = Query();

        return await queryable.DistinctBy(selector).ToListAsync();
    }
    
    public async Task<object?> GetFilteredProjectionAsync(Expression<Func<TEntity, bool>>? predicate, Expression<Func<TEntity, object>>? selector, bool isActive, bool isDeleted, bool ignoreState, params string[] includes)
    {
        IQueryable<TEntity> queryable = Query();

        if (includes.Length > 0) queryable = queryable.IncludeMultiple(includes);

        if (predicate != null)
        {
            queryable = queryable.Where(predicate);
        }

        // Dynamic filtering
        if (!ignoreState && typeof(TEntity).GetProperty("IsActive") != null && typeof(TEntity).GetProperty("IsDeleted") != null)
        {
            queryable = queryable.Where($"IsActive == {isActive} and IsDeleted == {isDeleted}");
        }

        if (selector != null)
        {
            var selResult = await queryable.Select(selector).FirstOrDefaultAsync(); // Awaiting the result
            return selResult; // This will be of type object? as expected
        }

        var result = await queryable.FirstOrDefaultAsync(); // Awaiting the result
        return result; // This will be of type TEntity, but it's fine since TEntity is an object
    }

    public async Task<IList<object>> GetAllFilteredProjectionAsync(Expression<Func<TEntity, bool>> predicate = null, Expression<Func<TEntity, object>>? selector = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null, int index = 0, int size = 10, bool enableTracking = true, bool isActive = true, bool isDeleted = false, bool ignoreState = false, CancellationToken cancellationToken = default, params string[] includes)
    {
        IQueryable<TEntity> queryable = Query();

        if (!enableTracking) queryable = queryable.AsNoTracking();

        if (includes.Length > 0) queryable = queryable.IncludeMultiple(includes);

        // Dynamic filtering
        if (!ignoreState && typeof(TEntity).GetProperty("IsActive") != null && typeof(TEntity).GetProperty("IsDeleted") != null)
        {
            queryable = queryable.Where($"IsActive == {isActive} and IsDeleted == {isDeleted}");
        }

        // Ekstra filtreleme
        if (predicate != null) queryable = queryable.Where(predicate);


        if (orderBy != null)
            return (IList<object>)await orderBy(queryable).ToListAsync();

        if (selector != null)
        {
            return await queryable.Select(selector).ToListAsync();
        }

        return (IList<object>)await queryable.ToListAsync();
    }
}

public static class DataAccessExtensions
{
    internal static IQueryable<T> IncludeMultiple<T>(this IQueryable<T> query,
        params string[] includes) where T : class
    {
        if (includes != null)
        {
            query = includes.Aggregate(query, (current, include) => current.Include(include));
        }
        return query;
    }
}

