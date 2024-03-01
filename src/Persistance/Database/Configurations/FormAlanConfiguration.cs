using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ITX.Domain.Entities.FormManagement;
using ITX.Domain.Shared.Enums;

namespace ITX.Persistance.Database.Configurations
{
    public class FormAlanConfiguration : IEntityTypeConfiguration<FormAlan>
    {
        public void Configure(EntityTypeBuilder<FormAlan> builder)
        {
            builder.ToTable("FormAlan");
            builder.HasKey(x => x.Id);

            DateTime time = new DateTime(2023, 1, 1);

            builder.HasData(new FormAlan
            {
                Id = 1,
                Ad = "Ad",
                VeriTip = EnmVeriTip.Text,
                SatirSira = 1,
                SutunSira = 1,
                TabloSira = 1,
                SutunGenislik = 6,
                FormTanimId = 1,
                Etiket = "Ad",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new FormAlan
            {
                Id = 2,
                Ad = "Aciklama",
                VeriTip = EnmVeriTip.Text,
                SatirSira = 1,
                SutunSira = 2,
                TabloSira = 2,
                SutunGenislik = 6,
                FormTanimId = 1,
                Etiket = "Açıklama",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new FormAlan
            {
                Id = 3,
                Ad = "Ad",
                VeriTip = EnmVeriTip.Text,
                SatirSira = 1,
                SutunSira = 1,
                TabloSira = 1,
                SutunGenislik = 6,
                FormTanimId = 2,
                Etiket = "Ad",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new FormAlan
            {
                Id = 4,
                Ad = "Kod",
                VeriTip = EnmVeriTip.Number,
                SatirSira = 1,
                SutunSira = 2,
                TabloSira = 2,
                SutunGenislik = 6,
                FormTanimId = 2,
                Etiket = "Kod",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });
        }
    }
}
