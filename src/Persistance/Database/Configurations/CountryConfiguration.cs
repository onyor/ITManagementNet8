using ITX.Domain.Entities.Predefined;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace ITX.Persistance.Database.Configurations
{
    public class CountryConfiguration : IEntityTypeConfiguration<Country>
    {
        public void Configure(EntityTypeBuilder<Country> builder)
        {
            builder.ToTable("Country");
            builder.HasKey(x => x.Id);
            builder.Property(b => b.Code).HasDefaultValue(0);

            DateTime time = new DateTime(2023, 1, 1);

            builder.HasData(new Country
            {
                Id = 1,
                Name = "Türkiye",
                PhoneCode = 90,
                CurrencyDefinitionId = 1,
                Code = "TR",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Country
            {
                Id = 2,
                Name = "Almanya",
                PhoneCode = 49,
                CurrencyDefinitionId = 1,
                Code = "DE",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });
        }
    }
}