using ITX.Application.Repositories.Predefined;
using ITX.Domain.Entities.FormManagement;
using ITX.Persistance.Database.Base;
using ITX.Persistance.Database.Context;

namespace ITX.Persistance.Database.Repositories.FormManagement
{
    public class EnumVeriRepository : EfRepositoryBase<EnumVeri>, IEnumVeriRepository
    {
        public EnumVeriRepository(ITManagementDbContext context) : base(context)
        {


        }
    }
}

