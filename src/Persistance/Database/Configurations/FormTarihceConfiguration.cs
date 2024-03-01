using ITX.Domain.Entities.FormManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ITX.Persistance.Database.Configurations
{
    public class FormTarihceConfiguration : IEntityTypeConfiguration<FormTarihce>
    {
        public void Configure(EntityTypeBuilder<FormTarihce> builder)
        {
            builder.ToTable("FormTarihce");
            builder.HasKey(x => x.Id);
        }
    }
}
