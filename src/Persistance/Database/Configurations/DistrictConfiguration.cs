using ITX.Domain.Entities.Predefined;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace ITX.Persistance.Database.Configurations
{
    public class DistrictConfiguration : IEntityTypeConfiguration<District>
    {
        public void Configure(EntityTypeBuilder<District> builder)
        {
            builder.ToTable("District");
            builder.HasKey(x => x.Id);
            builder.Property(b => b.Code).HasDefaultValue(0);

            DateTime time = new DateTime(2023, 1, 1);

            builder.HasData(new District
            {
                Id = 1,
                Name = "Üsküdar",
                Code = "34660",
                CityId = 1,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });
        }
    }
}
