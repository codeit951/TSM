using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TSM.EFCoreSqlServer.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: new Guid("0f0ffd14-6e96-4ed8-9f91-8306ef42e943"));

            migrationBuilder.AlterColumn<decimal>(
                name: "TakeProfit",
                table: "Trades",
                type: "decimal(18,8)",
                precision: 18,
                scale: 8,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "StopLoss",
                table: "Trades",
                type: "decimal(18,8)",
                precision: 18,
                scale: 8,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Quantity",
                table: "Trades",
                type: "decimal(18,8)",
                precision: 18,
                scale: 8,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Trades",
                type: "decimal(18,8)",
                precision: 18,
                scale: 8,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Fee",
                table: "Trades",
                type: "decimal(18,8)",
                precision: 18,
                scale: 8,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "ClosePrice",
                table: "Trades",
                type: "decimal(18,8)",
                precision: 18,
                scale: 8,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Locked",
                table: "Balances",
                type: "decimal(18,8)",
                precision: 18,
                scale: 8,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Available",
                table: "Balances",
                type: "decimal(18,8)",
                precision: 18,
                scale: 8,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserID", "Country", "CreatedOn", "Default_Currency", "Email", "EmailStatus", "FirstName", "LastLogin", "LastName", "Password", "Phone", "Plan", "ProfileImage", "ReferralCode", "ReferrerCode", "Roles", "Status", "_2FAKey" },
                values: new object[] { new Guid("0ff795be-372d-4d70-9d85-826d2cd5f751"), "United States", new DateTime(2025, 4, 10, 21, 34, 31, 97, DateTimeKind.Utc).AddTicks(5845), "USD", "Test@gmail.com", 1, "Test", new DateTime(2025, 4, 10, 21, 34, 31, 97, DateTimeKind.Utc).AddTicks(6247), "User", "AQAAAAIAAYagAAAAENO/b30WB3r+Z9XXAJw8IYQNKcaiKeemI6VHHuY/iS9vFEp7xN9a1y2vUz1eKQ/OkQ==", "1234567890", "Starter", null, "Test123", "Test123", "[\"User\"]", 0, "" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: new Guid("0ff795be-372d-4d70-9d85-826d2cd5f751"));

            migrationBuilder.AlterColumn<decimal>(
                name: "TakeProfit",
                table: "Trades",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,8)",
                oldPrecision: 18,
                oldScale: 8);

            migrationBuilder.AlterColumn<decimal>(
                name: "StopLoss",
                table: "Trades",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,8)",
                oldPrecision: 18,
                oldScale: 8);

            migrationBuilder.AlterColumn<decimal>(
                name: "Quantity",
                table: "Trades",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,8)",
                oldPrecision: 18,
                oldScale: 8);

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Trades",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,8)",
                oldPrecision: 18,
                oldScale: 8);

            migrationBuilder.AlterColumn<decimal>(
                name: "Fee",
                table: "Trades",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,8)",
                oldPrecision: 18,
                oldScale: 8);

            migrationBuilder.AlterColumn<decimal>(
                name: "ClosePrice",
                table: "Trades",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,8)",
                oldPrecision: 18,
                oldScale: 8);

            migrationBuilder.AlterColumn<decimal>(
                name: "Locked",
                table: "Balances",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,8)",
                oldPrecision: 18,
                oldScale: 8);

            migrationBuilder.AlterColumn<decimal>(
                name: "Available",
                table: "Balances",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,8)",
                oldPrecision: 18,
                oldScale: 8);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserID", "Country", "CreatedOn", "Default_Currency", "Email", "EmailStatus", "FirstName", "LastLogin", "LastName", "Password", "Phone", "Plan", "ProfileImage", "ReferralCode", "ReferrerCode", "Roles", "Status", "_2FAKey" },
                values: new object[] { new Guid("0f0ffd14-6e96-4ed8-9f91-8306ef42e943"), "United States", new DateTime(2025, 4, 10, 15, 54, 20, 665, DateTimeKind.Utc).AddTicks(6570), "USD", "Test@gmail.com", 1, "Test", new DateTime(2025, 4, 10, 15, 54, 20, 665, DateTimeKind.Utc).AddTicks(6767), "User", "AQAAAAIAAYagAAAAENO/b30WB3r+Z9XXAJw8IYQNKcaiKeemI6VHHuY/iS9vFEp7xN9a1y2vUz1eKQ/OkQ==", "1234567890", "Starter", null, "Test123", "Test123", "[\"User\"]", 0, "" });
        }
    }
}
