using Ardalis.Result;
using AutoMapper;
using ITX.Application.Dtos.Predefined;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.Predefined;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Domain.Entities.Predefined;
using ITX.Persistance.Database.Context;
using System;
using System.Threading.Tasks;
using ITX.Infrastructure.Helpers;

namespace ITX.Infrastructure.Data.Services.Predefined
{
    public class CountryService : BaseService<Country, CountryDto>, ICountryService
    {
        public CountryService(IMapper mapper, ITManagementDbContext context, IAsyncRepository<Country> repository, IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {
        }

        public async Task<Result<bool>> CustomerServiceAsync()
        {
            try
            {
                var country = new Country
                {
                    Id = 0,
                    Name = "Almanya",
                    PhoneCode = 90,
                    CurrencyDefinitionId = 1,
                    Code = "TR",
                    CreatedAt = new DateTime(2023, 1, 1),
                    CreatedBy = Guid.Empty,
                    IsActive = true,
                    IsDeleted = false
                };

                var city = new City
                {
                    Id = 0,
                    Name = "Musul",
                    Code = "82",
                    CountryId = 1,
                    PhoneCode = "216",
                    CreatedAt = new DateTime(2023, 1, 1),
                    CreatedBy = Guid.Empty,
                    IsActive = true,
                    IsDeleted = false
                };

                var countryInfo = _unitOfWork.Repository<Country>().AddAsync(country);

                var cityInfo = _unitOfWork.Repository<City>().AddAsync(city);

                await _unitOfWork.SaveAsync();

                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
