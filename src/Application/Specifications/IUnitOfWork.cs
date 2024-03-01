using ITX.Application.Repositories.IBase;
using System;
using System.Threading.Tasks;

namespace ITX.Application.Specifications
{
    public interface IUnitOfWork : IDisposable
    {
        IAsyncRepository<T> Repository<T>() where T : class, new();
        void Save();
        Task SaveAsync();
    }
}