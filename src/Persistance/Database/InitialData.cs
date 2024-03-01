using ITX.Application.Interfaces;
using ITX.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Persistance.Database
{
    public static class InitialData
    {
        static Guid guidIdUser1 = new Guid("0d7c3138-41f3-4b8f-b49f-6d29ebee185c");
        static Guid guidIdUser2 = new Guid("8b5a1bac-7ed9-4af3-a1bd-cc0b6039fba1");
        static Guid guidIdRole1 = new Guid("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e");
        static Guid guidIdRole2 = new Guid("112cad6b-69fc-4a39-8a0a-4a9993d51ae8");
        static DateTime time = new DateTime(2023, 1, 1);

        public static void SeedUsers(ModelBuilder builder)
        {
            var admin = new User
            {
                Id = guidIdUser1,
                Name = "Admin",
                Surname = "Admin",
                UserName = "admin",
                Email = "admin@itx.gov.tr",
                EmailConfirmed = true,
                Title = "IT Admin",
                PhoneNumber = "905322223344",
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                PasswordHash = "AQAAAAIAAYagAAAAEOvb8RXazpGAhRivxV5w3iMYTqvAkqhTlGkZ3isVke/cOXX5ZPHEG1sXLo8wci1xWw==",
                ConcurrencyStamp = "d7910375-73c4-4ba1-a627-d9d19e7bb029"
            };

            // Normal User
            var user1 = new User
            {
                Id = guidIdUser2,
                Name = "TestUser",
                Surname = "TestUser",
                UserName = "testUser",
                Email = "testuser@test.com.tr",
                EmailConfirmed = true,
                Title = "Yazılım Geliştirici",
                PhoneNumber = "5555555555",
                CreatedAt = time,
                CreatedBy = guidIdUser1,
                IsActive = true,
                PasswordHash = "AQAAAAIAAYagAAAAEAiSRmBhhUg0Suv4Zl7tdckULxM7GVDOixXGvV8dE26ha/HKQxAe3PpNqgd0KQBJaQ==",
                ConcurrencyStamp = "5af96ed3-e47b-4461-bb8b-a7c947f17bd2"
            };


            builder.Entity<User>().HasData(admin);

            builder.Entity<User>().HasData(user1);
        }
        public static void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<Role>().HasData(new Role
            {
                Id = guidIdRole1,
                Name = "Admin",
                Description = "Default role with all rights",
                CreatedAt = time,
                CreatedBy = guidIdUser1,
                IsActive = true
            });

            builder.Entity<Role>().HasData(new Role
            {
                Id = guidIdRole2,
                Name = "Tester",
                Description = "Default role with tester rights",
                CreatedAt = time,
                CreatedBy = guidIdUser1,
                IsActive = true
            });
        }
        public static void SeedUserRoles(ModelBuilder builder)
        {
            builder.Entity<UserRole>().HasData(
                new UserRole()
                {
                    RoleId = guidIdRole1,
                    UserId = guidIdUser1,
                    CreatedAt = time,
                    IsActive = true
                });

            builder.Entity<UserRole>().HasData(
                new UserRole()
                {
                    RoleId = guidIdRole2,
                    UserId = guidIdUser2,
                    CreatedAt = time,
                    IsActive = true
                });
        }
        public static void SeedUserClaims(ModelBuilder builder)
        {
            builder.Entity<UserClaim>().HasData(
                new UserClaim()
                {
                    Id = 1,
                    UserId = guidIdUser1,
                    ClaimValue = "Create User",
                    ClaimType = "View",
                    ClaimTypeId = 9,
                    CreatedAt = time,
                    IsActive = true
                });

            builder.Entity<UserClaim>().HasData(
                new UserClaim()
                {
                    Id = 2,
                    UserId = guidIdUser2,
                    ClaimValue = "Edit User",
                    ClaimType = "View",
                    ClaimTypeId = 9,
                    CreatedAt = time,
                    IsActive = true
                });
        }
        public static void SeedRoleClaims(ModelBuilder builder)
        {
            builder.Entity<RoleClaim>().HasData(
                new RoleClaim()
                {
                    Id = 1,
                    RoleId = guidIdRole1,
                    ClaimValue = "True",
                    ClaimType = "Save",
                    ClaimTypeId = 1,
                    CreatedAt = time,
                    IsActive = true
                });

            builder.Entity<RoleClaim>().HasData(
                new RoleClaim()
                {
                    Id = 2,
                    RoleId = guidIdRole1,
                    ClaimValue = "True",
                    ClaimType = "Edit",
                    ClaimTypeId = 2,
                    CreatedAt = time,
                    IsActive = true
                });

            builder.Entity<RoleClaim>().HasData(
                new RoleClaim()
                {
                    Id = 3,
                    RoleId = guidIdRole1,
                    ClaimValue = "True",
                    ClaimType = "Delete",
                    ClaimTypeId = 3,
                    CreatedAt = time,
                    IsActive = true
                });

            builder.Entity<RoleClaim>().HasData(
                new RoleClaim()
                {
                    Id = 4,
                    RoleId = guidIdRole1,
                    ClaimValue = "True",
                    ClaimType = "Add",
                    ClaimTypeId = 4,
                    CreatedAt = time,
                    IsActive = true
                });

            builder.Entity<RoleClaim>().HasData(
                new RoleClaim()
                {
                    Id = 5,
                    RoleId = guidIdRole1,
                    ClaimValue = "True",
                    ClaimType = "Export",
                    ClaimTypeId = 5,
                    CreatedAt = time,
                    IsActive = true
                });

            builder.Entity<RoleClaim>().HasData(
                new RoleClaim()
                {
                    Id = 6,
                    RoleId = guidIdRole1,
                    ClaimValue = "True",
                    ClaimType = "Import",
                    ClaimTypeId = 6,
                    CreatedAt = time,
                    IsActive = true
                });

            builder.Entity<RoleClaim>().HasData(
                new RoleClaim()
                {
                    Id = 7,
                    RoleId = guidIdRole1,
                    ClaimValue = "True",
                    ClaimType = "Passive",
                    ClaimTypeId = 7,
                    CreatedAt = time,
                    IsActive = true
                });

            builder.Entity<RoleClaim>().HasData(
                new RoleClaim()
                {
                    Id = 8,
                    RoleId = guidIdRole1,
                    ClaimValue = "True",
                    ClaimType = "Approve",
                    ClaimTypeId = 8,
                    CreatedAt = time,
                    IsActive = true
                });

            builder.Entity<RoleClaim>().HasData(
                new RoleClaim()
                {
                    Id = 9,
                    RoleId = guidIdRole1,
                    ClaimValue = "True",
                    ClaimType = "View",
                    ClaimTypeId = 9,
                    CreatedAt = time,
                    IsActive = true
                });

            builder.Entity<RoleClaim>().HasData(
                new RoleClaim()
                {
                    Id = 10,
                    RoleId = guidIdRole1,
                    ClaimValue = "True",
                    ClaimType = "Excel",
                    ClaimTypeId = 10,
                    CreatedAt = time,
                    IsActive = true
                });

            builder.Entity<RoleClaim>().HasData(
                new RoleClaim()
                {
                    Id = 11,
                    RoleId = guidIdRole1,
                    ClaimValue = "True",
                    ClaimType = "Pdf",
                    ClaimTypeId = 11,
                    CreatedAt = time,
                    IsActive = true
                });

            builder.Entity<RoleClaim>().HasData(
                new RoleClaim()
                {
                    Id = 12,
                    RoleId = guidIdRole1,
                    ClaimValue = "True",
                    ClaimType = "Switch",
                    ClaimTypeId = 12,
                    CreatedAt = time,
                    IsActive = true
                });

            builder.Entity<RoleClaim>().HasData(
                new RoleClaim()
                {
                    Id = 13,
                    RoleId = guidIdRole1,
                    ClaimValue = "True",
                    ClaimType = "LoginAs",
                    ClaimTypeId = 13,
                    CreatedAt = time,
                    IsActive = true
                });

            builder.Entity<RoleClaim>().HasData(
                new RoleClaim()
                {
                    Id = 14,
                    RoleId = guidIdRole1,
                    ClaimValue = "True",
                    ClaimType = "Active",
                    ClaimTypeId = 14,
                    CreatedAt = time,
                    IsActive = true
                });
        }
    }
}
