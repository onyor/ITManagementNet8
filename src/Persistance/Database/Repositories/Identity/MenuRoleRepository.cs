using ITX.Application.Repositories.Predefined;
using ITX.Domain.Entities.Identity;
using ITX.Persistance.Database.Base;
using ITX.Persistance.Database.Context;

namespace ITX.Persistance.Database.Repositories.Identity
{
    public class MenuRoleRepository : EfRepositoryBase<MenuRole>, IMenuRoleRepository
    {
        public MenuRoleRepository(ITManagementDbContext context) : base(context)
        {


        }
    }
}

