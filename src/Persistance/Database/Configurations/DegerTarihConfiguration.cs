using ITX.Domain.Entities.FormManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ITX.Persistance.Database.Configurations
{
    public class DegerTarihConfiguration : IEntityTypeConfiguration<DegerTarih>
    {
        public void Configure(EntityTypeBuilder<DegerTarih> builder)
        {
            builder.ToTable("DegerTarih");
            builder.HasKey(x => x.Id);
        }
    }
}
