using ITX.Application.Repositories.IBase;
using ITX.Domain.Entities.LogManagement;
using ITX.Domain.Entities.FormManagement;

namespace ITX.Application.Repositories.LogManagement
{
    public interface IAuditLogRepository : IAsyncRepository<AuditLog>
    {
    }
}