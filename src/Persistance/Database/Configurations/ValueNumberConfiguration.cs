using ITX.Domain.Entities.FormManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ITX.Persistance.Database.Configurations
{
    public class ValueNumberConfiguration : IEntityTypeConfiguration<ValueNumber>
    {
        public void Configure(EntityTypeBuilder<ValueNumber> builder)
        {
            builder.ToTable("ValueNumber");
            builder.Property(x => x.Deger)
                   .HasColumnType("decimal(18,2)");

            builder.HasKey(x => x.Id);
        }
    }
}
