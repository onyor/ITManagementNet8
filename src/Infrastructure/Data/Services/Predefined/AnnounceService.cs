using AutoMapper;
using ITX.Application.Dtos.Predefined;
using ITX.Application.Interfaces.Predefined;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Domain.Entities.Test;
using ITX.Domain.Entities.Predefined;
using ITX.Persistance.Database.Context;
using ITX.Application.Interfaces;
using ITX.Infrastructure.Helpers;

namespace ITX.Infrastructure.Data.Services.Predefined
{
    public class AnnounceService : BaseService<Announce, AnnounceDto>, IAnnounceService
    {
        public AnnounceService(IMapper mapper, ITManagementDbContext context, IAsyncRepository<Announce> repository, IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {

        }
    }
}
