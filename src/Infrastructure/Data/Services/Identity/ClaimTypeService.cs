using AutoMapper;
using ITX.Application.Dtos.Identity;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.Identity;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Domain.Entities.Identity;
using ITX.Persistance.Database.Context;
using ITX.Infrastructure.Helpers;

namespace ITX.Infrastructure.Data.Services.Identity
{
    public class ClaimTypeService : BaseService<ClaimType, ClaimTypeDto>, IClaimTypeService
    {
        public ClaimTypeService(IMapper mapper, ITManagementDbContext context, IAsyncRepository<ClaimType> repository, IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {
        }
    }
}
