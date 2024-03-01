using ITX.Application.Repositories.Predefined;
using ITX.Domain.Entities.Predefined;
using ITX.Persistance.Database.Base;
using ITX.Persistance.Database.Context;

namespace ITX.Persistance.Database.Repositories.Predefined
{
    public class AnnounceRepository : EfRepositoryBase<Announce>, IAnnounceRepository
    {
        public AnnounceRepository(ITManagementDbContext context) : base(context)
        {


        }
    }
}

