using ITX.Application.Repositories.Predefined;
using ITX.Domain.Entities.Identity;
using ITX.Persistance.Database.Base;
using ITX.Persistance.Database.Context;

namespace ITX.Persistance.Database.Repositories.Identity
{
    public class MenuRepository : EfRepositoryBase<Menu>, IMenuRepository
    {
        public MenuRepository(ITManagementDbContext context) : base(context)
        {


        }
    }
}

