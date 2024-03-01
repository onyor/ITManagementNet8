using AutoMapper;
using ITX.Application.Dtos.Predefined;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.Predefined;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Domain.Entities.Predefined;
using ITX.Infrastructure.Services;
using ITX.Persistance.Database.Context;
using ITX.Infrastructure.Helpers;

namespace ITX.Infrastructure.Data.Services.Predefined
{
    public class CityService : BaseService<City, CityDto>, ICityService
    {
        public CityService(IMapper mapper, ITManagementDbContext context, IAsyncRepository<City> repository, IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {

        }
    }
}
