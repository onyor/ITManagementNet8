using ITX.Application.Repositories.FormManagement;
using ITX.Domain.Entities.FormManagement;
using ITX.Persistance.Database.Base;
using ITX.Persistance.Database.Context;

namespace ITX.Persistance.Repositories.FormManagement;

public class FormTarihceRepository : EfRepositoryBase<FormTarihce>, IFormTarihceRepository
{
    public FormTarihceRepository(ITManagementDbContext context) : base(context)
    {

    }
}
