using ITX.Domain.Entities.Predefined;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ITX.Persistance.Database.Configurations
{
    public class AppSettingConfiguration : IEntityTypeConfiguration<AppSetting>
    {
        public void Configure(EntityTypeBuilder<AppSetting> builder)
        {
            builder.ToTable("AppSetting");

            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.Ad);
        }
    }
}
