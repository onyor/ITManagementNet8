using AutoMapper;
using ITX.Application.Dtos.Predefined;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.Predefined;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Domain.Entities.Predefined;
using ITX.Persistance.Database.Context;
using ITX.Infrastructure.Helpers;

namespace ITX.Infrastructure.Data.Services.Predefined
{
    public class CurrencyDefinitionService : BaseService<CurrencyDefinition, CurrencyDefinitionDto>, ICurrencyDefinitionService
    {
        public CurrencyDefinitionService(IMapper mapper, ITManagementDbContext context, IAsyncRepository<CurrencyDefinition> repository, IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {
        }
    }
}
