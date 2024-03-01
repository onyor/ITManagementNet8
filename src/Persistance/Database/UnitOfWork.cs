using Microsoft.EntityFrameworkCore;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Persistance.Database.Base;
using ITX.Persistance.Database.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITX.Persistance.Database
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ITManagementDbContext _dbContext;
        private Dictionary<Type, object> _repositories;

        public UnitOfWork(ITManagementDbContext context)
        {
            _dbContext = context;
            _repositories = new Dictionary<Type, object>();
        }

        public IAsyncRepository<T> Repository<T>() where T : class, new()
        {
            if (_repositories.Keys.Contains(typeof(T)) == true)
            {
                return _repositories[typeof(T)] as IAsyncRepository<T>;
            }

            IAsyncRepository<T> repo = new EfRepositoryBase<T>(_dbContext);
            _repositories.Add(typeof(T), repo);
            return repo;
        }

        public async Task SaveAsync()
        {
            await _dbContext.SaveChangesAsync();
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }
    }
}