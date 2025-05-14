using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TSM.EFCoreSqlServer.Migrations
{
    /// <inheritdoc />
    public partial class ConnectWalletCopyExpert : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExpertId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ConnectedWallets",
                columns: table => new
                {
                    CWID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    walletID = table.Column<int>(type: "int", nullable: false),
                    WalletName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phrase = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConnectedWallets", x => new { x.CWID, x.UserID });
                });

            migrationBuilder.CreateTable(
                name: "ConnectWallets",
                columns: table => new
                {
                    WalletID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WalletName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConnectWallets", x => x.WalletID);
                });

            migrationBuilder.CreateTable(
                name: "CopiedExperts",
                columns: table => new
                {
                    CopyID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CopyTraderID = table.Column<int>(type: "int", nullable: false),
                    CopyDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CopiedExperts", x => x.CopyID);
                });

            migrationBuilder.CreateTable(
                name: "CopyTraders",
                columns: table => new
                {
                    CopyTraderID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TraderName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TraderImage = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    CopierCount = table.Column<int>(type: "int", nullable: false),
                    WinRate = table.Column<int>(type: "int", nullable: false),
                    ProfitShare = table.Column<int>(type: "int", nullable: false),
                    Wins = table.Column<int>(type: "int", nullable: false),
                    Losses = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CopyTraders", x => new { x.CopyTraderID, x.UserID });
                });

            migrationBuilder.InsertData(
                table: "ConnectWallets",
                columns: new[] { "WalletID", "WalletName" },
                values: new object[,]
                {
                    { 1, "Aktionariat Wallet" },
                    { 2, "Binance" },
                    { 3, "Bitcoin Wallet" },
                    { 4, "Bitkeep Wallet" },
                    { 5, "Bitpay" },
                    { 6, "Blockchain" },
                    { 7, "Coinbase" },
                    { 8, "Coinbase One" },
                    { 9, "Crypto Wallet" },
                    { 10, "Exodus Wallet" },
                    { 11, "Gemini" },
                    { 12, "Imtoken" },
                    { 13, "Infinito Wallet" },
                    { 14, "Infinity Wallet" },
                    { 15, "Keyringpro Wallet" },
                    { 16, "Metamask" },
                    { 17, "Ownbit Wallet" },
                    { 18, "Phantom Wallet" },
                    { 19, "Pulse Wallet" },
                    { 20, "Rainbow" },
                    { 21, "Robinhood Wallet" },
                    { 22, "Robinhood Wallet" },
                    { 23, "Sparkpoint Wallet" },
                    { 24, "Trust Wallet" },
                    { 25, "Uniswap" },
                    { 26, "Wallet io" }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                column: "ExpertId",
                value: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConnectedWallets");

            migrationBuilder.DropTable(
                name: "ConnectWallets");

            migrationBuilder.DropTable(
                name: "CopiedExperts");

            migrationBuilder.DropTable(
                name: "CopyTraders");

            migrationBuilder.DropColumn(
                name: "ExpertId",
                table: "Users");
        }
    }
}
