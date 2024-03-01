using ITX.Domain.Entities.Predefined;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace ITX.Persistance.Database.Configurations
{
    public class CurrencyDefinitionConfiguration : IEntityTypeConfiguration<CurrencyDefinition>
    {
        public void Configure(EntityTypeBuilder<CurrencyDefinition> builder)
        {
            builder.ToTable("CurrencyDefinition");
            builder.HasKey(x => x.Id);

            DateTime time = new DateTime(2023, 1, 1);

            builder.HasData(new CurrencyDefinition
            {
                Id = 1,
                Name = "Türk Lirası",
                ShortName = "TL",
                Symbol = "₺",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });
        }

    }
}
