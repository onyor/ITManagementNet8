using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ITX.Domain.Entities.Predefined;

namespace ITX.Persistance.Database.Configurations
{ 
    public class AnnounceConfiguration : IEntityTypeConfiguration<Announce>
    {
        public void Configure(EntityTypeBuilder<Announce> builder)
        {
            builder.ToTable("Announce");
            builder.HasKey(x => x.Id);
        }
    }
}

