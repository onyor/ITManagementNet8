using ITX.Domain.Entities.Predefined;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace ITX.Persistance.Database.Configurations
{
    public class CityConfiguration : IEntityTypeConfiguration<City>
    {
        public void Configure(EntityTypeBuilder<City> builder)
        {
            builder.ToTable("City");
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.Name);

            DateTime time = new DateTime(2023, 1, 1);

            builder.HasData(new City
            {
                Id = 1,
                Name = "İstanbul",
                Code = "34",
                CountryId = 1,
                PhoneCode = "216",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new City
            {
                Id = 2,
                Name = "Ankara",
                Code = "06",
                CountryId = 1,
                PhoneCode = "312",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new City
            {
                Id = 3,
                Name = "Saksonya",
                Code = "",
                CountryId = 2,
                PhoneCode = "",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new City
            {
                Id = 4,
                Name = "Bremen",
                Code = "",
                CountryId = 2,
                PhoneCode = "",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });
        }
    }
}
