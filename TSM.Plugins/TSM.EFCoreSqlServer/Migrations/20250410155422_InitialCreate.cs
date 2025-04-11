using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TSM.EFCoreSqlServer.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Assets",
                columns: table => new
                {
                    AssetId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AssetName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AssetSymbol = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TradingView = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    AssetType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SpotLeverage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MarginLeverage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FutureLeverage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsStar = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assets", x => x.AssetId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Default_Currency = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReferralCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReferrerCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Plan = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    _2FAKey = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastLogin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Roles = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmailStatus = table.Column<int>(type: "int", nullable: false),
                    ProfileImage = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                });

            migrationBuilder.CreateTable(
                name: "Balances",
                columns: table => new
                {
                    BalanceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AssetId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Available = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Locked = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Balances", x => x.BalanceId);
                    table.ForeignKey(
                        name: "FK_Balances_Assets_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Assets",
                        principalColumn: "AssetId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Balances_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Trades",
                columns: table => new
                {
                    OrderID = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CloseTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Duration = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Symbol = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Side = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    StopLoss = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TakeProfit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Fee = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ClosePrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsCopied = table.Column<bool>(type: "bit", nullable: false),
                    CopiedTradeID = table.Column<int>(type: "int", nullable: false),
                    CopiedUserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FeePaid = table.Column<bool>(type: "bit", nullable: false),
                    OrderType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Leverage = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trades", x => new { x.OrderID, x.UserID });
                    table.ForeignKey(
                        name: "FK_Trades_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Assets",
                columns: new[] { "AssetId", "AssetName", "AssetSymbol", "AssetType", "FutureLeverage", "IsStar", "MarginLeverage", "SpotLeverage", "Status", "TradingView" },
                values: new object[,]
                {
                    { 1, "Bitcoin", "BTC", "Crypto", "", true, "", "", 1, "BITGET:BTCUSDT" },
                    { 2, "Ethereum", "ETH", "Crypto", "", true, "", "", 1, "BITGET:ETHUSDT" },
                    { 3, "United States Dollars", "USD", "Fiat", "", true, "", "", 1, "BITGET:LTCUSDT" },
                    { 4, "Apple", "AAPL", "Crypto", "", true, "", "", 1, "BITGET:LTCUSDT" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserID", "Country", "CreatedOn", "Default_Currency", "Email", "EmailStatus", "FirstName", "LastLogin", "LastName", "Password", "Phone", "Plan", "ProfileImage", "ReferralCode", "ReferrerCode", "Roles", "Status", "_2FAKey" },
                values: new object[] { new Guid("0f0ffd14-6e96-4ed8-9f91-8306ef42e943"), "United States", new DateTime(2025, 4, 10, 15, 54, 20, 665, DateTimeKind.Utc).AddTicks(6570), "USD", "Test@gmail.com", 1, "Test", new DateTime(2025, 4, 10, 15, 54, 20, 665, DateTimeKind.Utc).AddTicks(6767), "User", "AQAAAAIAAYagAAAAENO/b30WB3r+Z9XXAJw8IYQNKcaiKeemI6VHHuY/iS9vFEp7xN9a1y2vUz1eKQ/OkQ==", "1234567890", "Starter", null, "Test123", "Test123", "[\"User\"]", 0, "" });

            migrationBuilder.CreateIndex(
                name: "IX_Balances_AssetId",
                table: "Balances",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_Balances_UserId",
                table: "Balances",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Trades_UserID",
                table: "Trades",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Balances");

            migrationBuilder.DropTable(
                name: "Trades");

            migrationBuilder.DropTable(
                name: "Assets");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
