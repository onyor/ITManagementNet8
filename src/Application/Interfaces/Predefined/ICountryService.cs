using Ardalis.Result;
using ITX.Application.Dtos.Predefined;
using ITX.Domain.Entities.Predefined;
using System.Threading.Tasks;

namespace ITX.Application.Interfaces.Predefined
{
    public interface ICountryService : IBaseService<Country, CountryDto>
    {
        Task<Result<bool>> CustomerServiceAsync();
    }
}
