using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TSM.EFCoreSqlServer.Migrations
{
    /// <inheritdoc />
    public partial class CorrectColumn2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Duration",
                table: "SMSs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "SMSs");
        }
    }
}
