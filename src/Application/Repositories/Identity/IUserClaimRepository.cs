using ITX.Application.Repositories.IBase;
using ITX.Domain.Entities.Identity;

namespace ITX.Application.Interfaces.Identity
{
    public interface IUserClaimRepository : IAsyncRepository<UserClaim>
    {
        
    }
}