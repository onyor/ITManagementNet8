using ITX.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace ITX.Persistance.Database.Configurations
{
    public class MenuRoleConfiguration : IEntityTypeConfiguration<MenuRole>
    {
        public void Configure(EntityTypeBuilder<MenuRole> builder)
        {
            builder.ToTable("MenuRole");
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => new { x.MenuId, x.RoleId }).IsUnique();

            DateTime time = new DateTime(2023, 1, 1);

            builder.HasData(new MenuRole
            {
                Id = 1,
                MenuId = 1,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 2,
                MenuId = 2,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 3,
                MenuId = 3,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 4,
                MenuId = 4,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 5,
                MenuId = 5,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 6,
                MenuId = 6,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 7,
                MenuId = 7,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 8,
                MenuId = 8,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 9,
                MenuId = 9,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 10,
                MenuId = 10,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 11,
                MenuId = 11,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 12,
                MenuId = 12,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 13,
                MenuId = 13,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 14,
                MenuId = 14,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 15,
                MenuId = 15,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 16,
                MenuId = 16,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 17,
                MenuId = 17,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 18,
                MenuId = 18,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 19,
                MenuId = 19,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 20,
                MenuId = 20,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 21,
                MenuId = 21,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 22,
                MenuId = 22,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 23,
                MenuId = 23,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 24,
                MenuId = 24,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 25,
                MenuId = 25,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 26,
                MenuId = 26,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });
            builder.HasData(new MenuRole
            {
                Id = 27,
                MenuId = 27,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });
            builder.HasData(new MenuRole
            {
                Id = 28,
                MenuId = 28,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 29,
                MenuId = 29,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });

            builder.HasData(new MenuRole
            {
                Id = 30,
                MenuId = 30,
                RoleId = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"),
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });
        }
    }
}
