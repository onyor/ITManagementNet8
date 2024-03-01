using ITX.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace ITX.Persistance.Database.Configurations
{
    public class MenuConfiguration : IEntityTypeConfiguration<Menu>
    {
        public void Configure(EntityTypeBuilder<Menu> builder)
        {
            builder.ToTable("Menu");
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name).HasMaxLength(100);
            builder.Property(x => x.Icon).HasMaxLength(100);
            builder.Property(x => x.Url).HasMaxLength(100);
            builder.Property(x => x.Description).HasMaxLength(255);
            builder.Property(x => x.Param).HasMaxLength(100);

            builder.HasMany(x => x.MenuRoles)
               .WithOne(y => y.Menu)
               .HasForeignKey(y => y.MenuId)
               .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Children)
                .WithOne(y => y.Parent)
                .HasForeignKey(y => y.ParentId)
                .OnDelete(DeleteBehavior.NoAction);

            DateTime time = new DateTime(2023, 1, 1);

            #region Yönetim Paneli

            builder.HasData(new Menu
            {
                Id = 1,
                Name = "Yönetim Paneli",
                Icon = "fas fa-user-cog",
                Order = 1,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 2,
                Name = "Sistem Tanımlamalar",
                Order = 1,
                ParentId = 1,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 3,
                Name = "Sistem Veri Giriş",
                Order = 2,
                ParentId = 1,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 4,
                Name = "Yetkilendirme",
                Order = 3,
                ParentId = 1,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 5,
                Name = "Duyurular",
                Url = "Predefined/Announce",
                Order = 4,
                ParentId = 1,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 6,
                Name = "Audit Log",
                Url = "Administration/AuditLog",
                Order = 5,
                ParentId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });


            builder.HasData(new Menu
            {
                Id = 7,
                Name = "Form Tanım",
                Url = "FormYonetim/FormList",
                Order = 1,
                ParentId = 2,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 8,
                Name = "Enum Tanım",
                Url = "FormYonetim/VeriList",
                Order = 2,
                ParentId = 2,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false,
                Param = "1"
            });

            builder.HasData(new Menu
            {
                Id = 9,
                Name = "Döviz Tanim",
                Url = "Predefined/CurrencyDefinition",
                Order = 3,
                ParentId = 2,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 10,
                Name = "Enum Veri Giriş",
                Url = "FormYonetim/EnumVeri",
                Order = 1,
                ParentId = 3,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 11,
                Name = "Form Veri Giriş",
                Url = "FormYonetim/VeriList",
                Order = 2,
                ParentId = 3,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 12,
                Name = "Rol Tanım",
                Url = "Administration/Role",
                Order = 1,
                ParentId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 13,
                Name = "Kullanıcı Listesi",
                Url = "Administration/User",
                Order = 2,
                ParentId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 14,
                Name = "Menu Tanım",
                Url = "Administration/Menu",
                Order = 3,
                ParentId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 15,
                Name = "Request Log",
                Url = "Administration/RequestLog",
                Order = 4,
                ParentId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false,
                Param = "1"
            });

            builder.HasData(new Menu
            {
                Id = 16,
                Name = "Yetki Tanımlama",
                Url = "Administration/AdministrationClaim",
                Order = 6,
                ParentId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 17,
                Name = "Yetki Atama",
                Url = "Administration/ClaimType",
                Order = 7,
                ParentId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            #endregion

            #region Genel Tanımlamalar

            builder.HasData(new Menu
            {
                Id = 18,
                Name = "Genel Tanımlamalar",
                Icon = "fas fa-bars",
                Order = 2,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 19,
                Name = "Kurumsal Tanımlamalar",
                Order = 1,
                ParentId = 18,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 20,
                Name = "Parametre Ayarları",
                Url = "Predefined/AppSetting",
                Order = 1,
                ParentId = 18,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 21,
                Name = "Ülke Tanim",
                Url = "Predefined/Country",
                Order = 2,
                ParentId = 19,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 22,
                Name = "İl Tanim",
                Url = "Predefined/City",
                Order = 3,
                ParentId = 19,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 23,
                Name = "İlçe Tanim",
                Url = "Predefined/District",
                Order = 4,
                ParentId = 19,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 24,
                Name = "Tab Management",
                Url = "Predefined/PredefinedManagement",
                Order = 5,
                ParentId = 25,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });
            #endregion

            #region Test

            builder.HasData(new Menu
            {
                Id = 25,
                Name = "Example",
                Icon = "fas fa-question",
                Order = 1000,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 26,
                Name = "Entity Build",
                Url = "Test/Scenario",
                Order = 10,
                ParentId = 25,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            }); 
            
            builder.HasData(new Menu
            {
                Id = 27,
                Name = "Rapor Ekranı",
                Url = "Test/GeneralReport",
                Order = 20,
                ParentId = 25,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 28,
                Name = "Student",
                Url = "Test/Student",
                Order = 30,
                ParentId = 25,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 29,
                Name = "Lesson",
                Url = "Test/Lesson",
                Order = 40,
                ParentId = 25,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new Menu
            {
                Id = 30,
                Name = "Entity Build with Param",
                Url = "Test/Scenario",
                Order = 11,
                Param = "1",
                ParentId = 25,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            #endregion
        }
    }
}
