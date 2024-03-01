using ITX.Domain.Entities.FormManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace ITX.Persistance.Database.Configurations
{
    public class EnumVeriConfiguration : IEntityTypeConfiguration<EnumVeri>
    {
        public void Configure(EntityTypeBuilder<EnumVeri> builder)
        {
            builder.ToTable("EnumVeri");
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.EnumTanimId);
            builder.HasIndex(x => x.Ad);
            builder.HasIndex(x => x.SiraNo);
            builder.HasIndex(x => x.Kod);

            builder.Property(x => x.Ad).HasMaxLength(250).IsRequired();
            builder.Property(x => x.Kod).HasMaxLength(50).IsRequired();

            DateTime time = new DateTime(2023, 1, 1);

            builder.HasData(new EnumVeri
            {
                Id = 1,
                Ad = "Tanımsız",
                Deger = 0,
                SiraNo = 1,
                Kod = "Undefined",
                EnumTanimId = 1,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new EnumVeri
            {
                Id = 2,
                Ad = "Erkek",
                Deger = 10,
                SiraNo = 2,
                Kod = "Erkek",
                EnumTanimId = 1,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new EnumVeri
            {
                Id = 3,
                Ad = "Kadın",
                Deger = 20,
                SiraNo = 3,
                Kod = "Kadin",
                EnumTanimId = 1,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new EnumVeri
            {
                Id = 4,
                Ad = "Tanımsız",
                Deger = 0,
                SiraNo = 1,
                Kod = "Undefined",
                EnumTanimId = 2,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new EnumVeri
            {
                Id = 5,
                Ad = "Başarılı",
                Deger = 10,
                SiraNo = 2,
                Kod = "Basarili",
                EnumTanimId = 2,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new EnumVeri
            {
                Id = 6,
                Ad = "Başarısız",
                Deger = 20,
                SiraNo = 3,
                Kod = "Basarisiz",
                EnumTanimId = 2,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new EnumVeri
            {
                Id = 7,
                Ad = "Hatalı",
                Deger = 30,
                SiraNo = 4,
                Kod = "Hatali",
                EnumTanimId = 2,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new EnumVeri
            {
                Id = 8,
                Ad = "Tarihçe",
                Deger = 40,
                SiraNo = 5,
                Kod = "Tarihce",
                EnumTanimId = 2,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });


            builder.HasData(new EnumVeri
            {
                Id = 9,
                Ad = "Tanımsız",
                Deger = 0,
                SiraNo = 1,
                Kod = "Undefined",
                EnumTanimId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new EnumVeri
            {
                Id = 10,
                Ad = "Sayı",
                Deger = 10,
                SiraNo = 2,
                Kod = "Sayi",
                EnumTanimId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new EnumVeri
            {
                Id = 11,
                Ad = "Tarih",
                Deger = 20,
                SiraNo = 3,
                Kod = "Tarih",
                EnumTanimId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new EnumVeri
            {
                Id = 12,
                Ad = "Bool",
                Deger = 30,
                SiraNo = 4,
                Kod = "Bool",
                EnumTanimId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new EnumVeri
            {
                Id = 13,
                Ad = "Metin",
                Deger = 40,
                SiraNo = 5,
                Kod = "Metin",
                EnumTanimId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });
            builder.HasData(new EnumVeri
            {
                Id = 14,
                Ad = "Liste Oluştur",
                Deger = 50,
                SiraNo = 6,
                Kod = "ListeOlustur",
                EnumTanimId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });
            builder.HasData(new EnumVeri
            {
                Id = 15,
                Ad = "Mevcut Veri",
                Deger = 60,
                SiraNo = 7,
                Kod = "MevcutVeri",
                EnumTanimId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new EnumVeri
            {
                Id = 16,
                Ad = "Bağlı Veri",
                Deger = 70,
                SiraNo = 8,
                Kod = "BagliVeri",
                EnumTanimId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });


            builder.HasData(new EnumVeri
            {
                Id = 17,
                Ad = "Tanımsız",
                Deger = 0,
                SiraNo = 1,
                Kod = "Undefined",
                EnumTanimId = 5,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new EnumVeri
            {
                Id = 18,
                Ad = "Başarılı",
                Deger = 10,
                SiraNo = 2,
                Kod = "Basarili",
                EnumTanimId = 5,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new EnumVeri
            {
                Id = 19,
                Ad = "Başarısız",
                Deger = 20,
                SiraNo = 3,
                Kod = "Basarisiz",
                EnumTanimId = 5,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new EnumVeri
            {
                Id = 20,
                Ad = "Hatalı",
                Deger = 30,
                SiraNo = 4,
                Kod = "Hatali",
                EnumTanimId = 5,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new EnumVeri
            {
                Id = 21,
                Ad = "Tarihçe",
                Deger = 40,
                SiraNo = 5,
                Kod = "Tarihce",
                EnumTanimId = 5,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });


        }
    }
}

