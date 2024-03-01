using ITX.Domain.Entities.LogManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ITX.Persistance.Database.Configurations
{
    public class AuditLogConfiguration : IEntityTypeConfiguration<AuditLog>
    {
        public void Configure(EntityTypeBuilder<AuditLog> builder)
        {
            builder.ToTable("AuditLog");
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Type).HasMaxLength(100);
            builder.Property(x => x.TableName).HasMaxLength(100);
            builder.Property(x => x.PrimaryKey).HasMaxLength(100);
        }
    }
}
