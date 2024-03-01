
using ITX.Domain.Entities;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ITX.Application.Repositories.IBase;

public interface IDataRepository<TEntity> where TEntity : class, new()
{
    IQueryable<TEntity> ReadOnly { get; }
    IQueryable<TEntity> GetAll();

    IQueryable<TEntity> GetMany(Expression<Func<TEntity, bool>> predicate);

    IQueryable<TEntity> GetMany(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, object>>[]? includes = null);

    Task<TEntity> Get(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, object>>[]? includes = null);

    Task<TEntity> GetById(int id, Expression<Func<TEntity, object>>[]? includes = null);

    Task<bool> Insert(TEntity entity);

    Task<bool> Update(TEntity entity);

    Task<bool> Delete(TEntity entity);

}
