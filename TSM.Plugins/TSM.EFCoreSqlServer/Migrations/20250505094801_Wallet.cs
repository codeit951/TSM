using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TSM.EFCoreSqlServer.Migrations
{
    /// <inheritdoc />
    public partial class Wallet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WalletAddresses",
                columns: table => new
                {
                    WalletID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CoinType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Network = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CoinName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WalletAddresses", x => x.WalletID);
                });

            migrationBuilder.InsertData(
                table: "WalletAddresses",
                columns: new[] { "WalletID", "Address", "CoinName", "CoinType", "Network", "Status" },
                values: new object[,]
                {
                    { 1, "0x1234567890abcdef1234567890abcdef12345678", "Bitcoin", "BTC", "Blockchain", 1 },
                    { 2, "0xabcdef1234567890abcdef1234567890abcdef12", "Etherum", "ETH", "Blockchain", 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WalletAddresses");
        }
    }
}
