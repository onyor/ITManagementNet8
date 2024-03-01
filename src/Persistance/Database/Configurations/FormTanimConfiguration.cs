using ITX.Domain.Entities.FormManagement;
using ITX.Domain.Entities.Predefined;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace ITX.Persistance.Database.Configurations
{
    public class FormTanimConfiguration : IEntityTypeConfiguration<FormTanim>
    {
        public void Configure(EntityTypeBuilder<FormTanim> builder)
        {
            builder.ToTable("FormTanim");
            builder.HasKey(x => x.Id);

            builder.HasMany(x => x.AltNesneler)
                .WithOne(y => y.UstNesne)
                .HasForeignKey(y => y.UstId)
                .OnDelete(DeleteBehavior.NoAction);

            DateTime time = new DateTime(2023, 1, 1);

            builder.HasData(new FormTanim
            {
                Id = 1,
                Ad = "Enum Tanım",
                Baslik= "Enum Tanım",
                Aciklama = "Enum Başlık Bilgileri",
                NormalizeAd = "EnumTanim",
                Statik=false,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new FormTanim
            {
                Id = 2,
                Ad = "Ulaşım Araç",
                Baslik= "Ulaşım Araç",
                Aciklama = "Ulaşım Araç Bilgileri",
                NormalizeAd = "UlasimArac",
                Statik=false,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

           
        }
    }
}
