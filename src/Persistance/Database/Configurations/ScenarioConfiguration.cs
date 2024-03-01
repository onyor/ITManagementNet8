using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ITX.Domain.Entities.Test;
using ITX.Domain.Entities.Predefined;
using ITX.Domain.Shared.Enums;
using VirtoCommerce.Platform.Core.Common;
using Nest;

namespace ITX.Infrastructure.Data.Configurations
{
    public class ScenarioConfiguration : IEntityTypeConfiguration<Scenario>
    {
        public void Configure(EntityTypeBuilder<Scenario> builder)
        {
            builder.ToTable("Scenario");
            builder.HasKey(x => x.Id);

            DateTime time = new DateTime(2023, 1, 1);

            builder.HasData(new Scenario
            {
                Id = 1,
                Name = "Scenario Test 1",
                UlasimAracId = 3,
                GenderId = EnmGender.Male,
                RequestLogTypeCodeId = EnmRequestLogTypeCode.Basarili,
                TestDescription = "Test Description",
                TestDeger = 999,
                TestBaslik = "Test Baþlýk",
                CountryId = 1,
                CityId = 1,
                CurrencyDefinitionId = 1,
                TestTarih = time,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Scenario
            {
                Id = 2,
                Name = "Scenario Test 2",
                UlasimAracId = 3,
                GenderId = EnmGender.Female,
                RequestLogTypeCodeId = EnmRequestLogTypeCode.Hatali,
                TestDescription = "Test Description",
                TestDeger = 111,
                TestBaslik = "Test Baþlýk",
                CountryId = 1,
                CityId = 2,
                CurrencyDefinitionId = 1,
                TestTarih = time,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

        }
    }
}
