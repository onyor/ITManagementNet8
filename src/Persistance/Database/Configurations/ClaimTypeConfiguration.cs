using ITX.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ITX.Infrastructure.Data.Configurations
{
    public class ClaimTypeConfiguration : IEntityTypeConfiguration<ClaimType>
    {
        public void Configure(EntityTypeBuilder<ClaimType> builder)
        {
            builder.ToTable("ClaimType");
            builder.HasKey(x => x.Id);

            DateTime time = new DateTime(2023, 1, 1);

            builder.HasData(new ClaimType
            {
                Id = 1,
                Name = "Save",
                Description = "Kaydet",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ClaimType
            {
                Id = 2,
                Name = "Edit",
                Description = "Düzenle",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ClaimType
            {
                Id = 3,
                Name = "Delete",
                Description = "Sil",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ClaimType
            {
                Id = 4,
                Name = "Add",
                Description = "Ekle",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });


            builder.HasData(new ClaimType
            {
                Id = 5,
                Name = "Export",
                Description = "Dýþa Aktar",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ClaimType
            {
                Id = 6,
                Name = "Import",
                Description = "Ýçe Aktar",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ClaimType
            {
                Id = 7,
                Name = "Passive",
                Description = "Pasif",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ClaimType
            {
                Id = 8,
                Name = "Approve",
                Description = "Onayla",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ClaimType
            {
                Id = 9,
                Name = "View",
                Description = "Görüntüle",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ClaimType
            {
                Id = 10,
                Name = "Excel",
                Description = "Excel Görüntüle",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ClaimType
            {
                Id = 11,
                Name = "Pdf",
                Description = "Pdf Görüntüle",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ClaimType
            {
                Id = 12,
                Name = "Switch",
                Description = "Anahtar",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ClaimType
            {
                Id = 13,
                Name = "LoginAs",
                Description = "Login",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ClaimType
            {
                Id = 14,
                Name = "Active",
                Description = "Aktif",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });
        }
    }
}
