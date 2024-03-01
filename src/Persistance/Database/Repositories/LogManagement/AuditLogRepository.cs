using ITX.Application.Repositories.LogManagement;
using ITX.Application.Repositories.FormManagement;
using ITX.Domain.Entities.LogManagement;
using ITX.Domain.Entities.FormManagement;
using ITX.Persistance.Database.Base;
using ITX.Persistance.Database.Context;

namespace ITX.Application.Repositories.LogManagement;

public class AuditLogRepository : EfRepositoryBase<AuditLog>, IAuditLogRepository
{
    public AuditLogRepository(ITManagementDbContext context) : base(context)
    {

    }

}

public class RequestLogRepository : EfRepositoryBase<RequestLog>, IRequestLogRepository
{
    public RequestLogRepository(ITManagementDbContext context) : base(context)
    {

    }
}
