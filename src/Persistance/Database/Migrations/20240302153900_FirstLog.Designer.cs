﻿// <auto-generated />
using System;
using ITX.Persistance.Database.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ITX.Persistance.Database.Migrations
{
    [DbContext(typeof(ITManagementLogContext))]
    [Migration("20240302153900_FirstLog")]
    partial class FirstLog
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ITX.Domain.Entities.LogManagement.RequestLog", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<long?>("FieldId")
                        .HasColumnType("bigint");

                    b.Property<string>("FieldName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fonksiyon")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HataKod")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsSystem")
                        .HasColumnType("bit");

                    b.Property<string>("Islem")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RemoteIp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RequestLogTypeCodeId")
                        .HasColumnType("int");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.ToTable("RequestLogs");
                });
#pragma warning restore 612, 618
        }
    }
}
