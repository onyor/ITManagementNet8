using ITX.Domain.Entities.FormManagement;
using ITX.Domain.Shared.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace ITX.Persistance.Database.Configurations
{
    public class ValueTextConfiguration : IEntityTypeConfiguration<ValueText>
    {
        public void Configure(EntityTypeBuilder<ValueText> builder)
        {
            builder.ToTable("ValueText");
            builder.HasKey(x => x.Id);

            DateTime time = new DateTime(2023, 1, 1);

            builder.HasData(new ValueText
            {
                Id = 1,
                Deger = "EnmGender",
                FormTanimId = 1,
                FormAlanId = 1,
                FormDegerId = 1,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 2,
                Deger = "EnmGender",
                FormTanimId = 1,
                FormAlanId = 2,
                FormDegerId = 1,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 3,
                Deger = "EnmRequestLogTypeCode",
                FormTanimId = 1,
                FormAlanId = 1,
                FormDegerId = 2,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 4,
                Deger = "EnmRequestLogTypeCode",
                FormTanimId = 1,
                FormAlanId = 2,
                FormDegerId = 2,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 5,
                Deger = "Tren",
                FormTanimId = 2,
                FormAlanId = 3,
                FormDegerId = 3,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 6,
                Deger = "10",
                FormTanimId = 2,
                FormAlanId = 4,
                FormDegerId = 3,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });


            builder.HasData(new ValueText
            {
                Id = 7,
                Deger = "EnmVeriTip",
                FormTanimId = 1,
                FormAlanId = 1,
                FormDegerId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 8,
                Deger = "EnmVeriTip",
                FormTanimId = 1,
                FormAlanId = 2,
                FormDegerId = 4,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 9,
                Deger = "EnmRequestLogTypeCode",
                FormTanimId = 1,
                FormAlanId = 1,
                FormDegerId = 5,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 10,
                Deger = "EnmRequestLogTypeCode",
                FormTanimId = 1,
                FormAlanId = 2,
                FormDegerId = 5,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 11,
                Deger = "EnmAppointmentType",
                FormTanimId = 1,
                FormAlanId = 1,
                FormDegerId = 6,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 12,
                Deger = "EnmAppointmentType",
                FormTanimId = 1,
                FormAlanId = 2,
                FormDegerId = 6,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 13,
                Deger = "EnmStatus",
                FormTanimId = 1,
                FormAlanId = 1,
                FormDegerId = 7,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 14,
                Deger = "EnmStatus",
                FormTanimId = 1,
                FormAlanId = 2,
                FormDegerId = 7,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 15,
                Deger = "EnmTransferType",
                FormTanimId = 1,
                FormAlanId = 1,
                FormDegerId = 8,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 16,
                Deger = "EnmTransferType",
                FormTanimId = 1,
                FormAlanId = 2,
                FormDegerId = 8,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 17,
                Deger = "EnmRiskStatus",
                FormTanimId = 1,
                FormAlanId = 1,
                FormDegerId = 9,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 18,
                Deger = "EnmRiskStatus",
                FormTanimId = 1,
                FormAlanId = 2,
                FormDegerId = 9,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });


            builder.HasData(new ValueText
            {
                Id = 19,
                Deger = "EnmBlockType",
                FormTanimId = 1,
                FormAlanId = 1,
                FormDegerId = 10,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 20,
                Deger = "EnmBlockType",
                FormTanimId = 1,
                FormAlanId = 2,
                FormDegerId = 10,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 21,
                Deger = "EnmAppointmentStatus",
                FormTanimId = 1,
                FormAlanId = 1,
                FormDegerId = 11,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 22,
                Deger = "EnmAppointmentStatus",
                FormTanimId = 1,
                FormAlanId = 2,
                FormDegerId = 11,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 23,
                Deger = "EnmImportance",
                FormTanimId = 1,
                FormAlanId = 1,
                FormDegerId = 12,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new ValueText
            {
                Id = 24,
                Deger = "EnmImportance",
                FormTanimId = 1,
                FormAlanId = 2,
                FormDegerId = 12,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });
        }
    }
}
