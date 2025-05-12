using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TSM.EFCoreSqlServer.Migrations
{
    /// <inheritdoc />
    public partial class editSignalColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PlanName",
                table: "Signals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlanName",
                table: "Signals");
        }
    }
}
