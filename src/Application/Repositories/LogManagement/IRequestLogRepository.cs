using ITX.Application.Repositories.IBase;
using ITX.Domain.Entities.LogManagement;

namespace ITX.Application.Repositories.LogManagement
{
    public interface IRequestLogRepository : IAsyncRepository<RequestLog>
    {
    }
}