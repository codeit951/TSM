using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TSM.EFCoreSqlServer.Migrations
{
    /// <inheritdoc />
    public partial class CorrectColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PlanName",
                table: "SMSs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PlanSymbol",
                table: "SMSs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlanName",
                table: "SMSs");

            migrationBuilder.DropColumn(
                name: "PlanSymbol",
                table: "SMSs");
        }
    }
}
