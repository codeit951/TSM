using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TSM.EFCoreSqlServer.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SMSs",
                table: "SMSs");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SMSs",
                table: "SMSs",
                columns: new[] { "SMSID", "UserID" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SMSs",
                table: "SMSs");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SMSs",
                table: "SMSs",
                columns: new[] { "PlanID", "UserID" });
        }
    }
}
