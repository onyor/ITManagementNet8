using ITX.Application.Repositories.Predefined;
using ITX.Domain.Entities.Predefined;
using ITX.Persistance.Database.Base;
using ITX.Persistance.Database.Context;

namespace ITX.Persistance.Database.Repositories.Predefined
{
    public class CurrencyDefinitionRepository : EfRepositoryBase<CurrencyDefinition>, ICurrencyDefinitionRepository
    {
        public CurrencyDefinitionRepository(ITManagementDbContext context) : base(context)
        {


        }
    }
}

