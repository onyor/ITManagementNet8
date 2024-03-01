using ITX.Application.Repositories.FormManagement;
using ITX.Domain.Entities.FormManagement;
using ITX.Persistance.Database.Base;
using ITX.Persistance.Database.Context;

namespace ITX.Persistance.Repositories.FormManagement;

public class FormTanimRepository : EfRepositoryBase<FormTanim>, IFormTanimRepository
{
    public FormTanimRepository(ITManagementDbContext context) : base(context)
    {

    }
}
