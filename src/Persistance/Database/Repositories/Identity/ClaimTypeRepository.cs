using ITX.Application.Interfaces.Identity;
using ITX.Domain.Entities.Identity;
using ITX.Persistance.Database.Base;
using ITX.Persistance.Database.Context;

namespace ITX.Infrastructure.Data.Repositories.Identity
{
    public class ClaimTypeRepository : EfRepositoryBase<ClaimType>, IClaimTypeRepository
    {
        public ClaimTypeRepository(ITManagementDbContext context) : base(context)
        {

        }
    }
}
