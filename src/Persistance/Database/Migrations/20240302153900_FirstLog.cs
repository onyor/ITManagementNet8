using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ITX.Persistance.Database.Migrations
{
    /// <inheritdoc />
    public partial class FirstLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RequestLogs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    RemoteIp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FieldId = table.Column<long>(type: "bigint", nullable: true),
                    FieldName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Fonksiyon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Islem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RequestLogTypeCodeId = table.Column<int>(type: "int", nullable: false),
                    HataKod = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsSystem = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestLogs", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RequestLogs");
        }
    }
}
