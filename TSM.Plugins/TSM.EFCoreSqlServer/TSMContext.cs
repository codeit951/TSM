using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;

namespace TSM.EFCoreSqlServer
{
    public class TSMContext : DbContext
    {
        public TSMContext(DbContextOptions<TSMContext> options) : base(options)
        {

        }
        public DbSet<User>? Users { get; set; }
        public DbSet<Trade>? Trades { get; set; }
        public DbSet<Balance>? Balances { get; set; }
        public DbSet<Asset>? Assets { get; set; }
        public DbSet<Transaction>? Transactions { get; set; }
        public DbSet<WalletAddress>? WalletAddresses { get; set; }
        public DbSet<Signal>? Signals { get; set; }
        public DbSet<SMS>? SMSs { get; set; }
        public DbSet<SMSPlan>? SMSPlans { get; set; }
        public DbSet<SignalPlan>? SignalPlans { get; set; }
        public DbSet<ConnectWallet>? ConnectWallets { get; set; }
        public DbSet<ConnectedWallet>? ConnectedWallets { get; set; }
        public DbSet<CopyTrader>? CopyTraders { get; set; }
        public DbSet<CopiedExpert>? CopiedExperts { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Trade>()
                .HasKey(t => new { t.OrderID, t.UserID });

            modelBuilder.Entity<Transaction>()
                .HasKey(t => new { t.TransactionID, t.UserID });

            modelBuilder.Entity<WalletAddress>()
                .HasKey(t => new { t.WalletID });

            modelBuilder.Entity<Signal>()
                .HasKey(t => new { t.SignalID, t.UserID });

            modelBuilder.Entity<SMS>()
                .HasKey(t => new { t.SMSID, t.UserID });

            modelBuilder.Entity<SMSPlan>()
                .HasKey(t => new { t.PlanID });

            modelBuilder.Entity<SignalPlan>()
                .HasKey(t => new { t.PlanID });

            modelBuilder.Entity<ConnectWallet>()
                .HasKey(c => new { c.WalletID });

            modelBuilder.Entity<ConnectedWallet>()
                .HasKey(c => new { c.CWID, c.UserID });

            modelBuilder.Entity<CopyTrader>()
                .HasKey(c => new { c.CopyTraderID,c.UserID});

            modelBuilder.Entity<CopiedExpert>()
                .HasKey(c => new { c.CopyID });

            
            modelBuilder.Entity<Balance>(entity =>
            {
                entity.Property(b => b.Available).HasPrecision(18, 8);
                entity.Property(b => b.Locked).HasPrecision(18, 8);
            });

            modelBuilder.Entity<Trade>(entity =>
            {
                entity.Property(t => t.ClosePrice).HasPrecision(18, 8);
                entity.Property(t => t.Fee).HasPrecision(18, 8);
                entity.Property(t => t.Price).HasPrecision(18, 8);
                entity.Property(t => t.Quantity).HasPrecision(18, 8);
                entity.Property(t => t.StopLoss).HasPrecision(18, 8);
                entity.Property(t => t.TakeProfit).HasPrecision(18, 8);
            });

            modelBuilder.Entity<Transaction>(entity =>
            {
                entity.Property(t => t.Amount).HasPrecision(18, 8);
            });

            modelBuilder.Entity<SMS>(entity =>
            {
                entity.Property(t => t.Balance).HasPrecision(18, 8);
            });

            modelBuilder.Entity<User>().HasData(
                 new User
                 {
                     FirstName = "Test",
                     LastName = "User",
                     Email = "Test@gmail.com",
                     Password = "AQAAAAIAAYagAAAAENO/b30WB3r+Z9XXAJw8IYQNKcaiKeemI6VHHuY/iS9vFEp7xN9a1y2vUz1eKQ/OkQ==",
                     Phone = "1234567890",
                     Country = "United States",
                     Default_Currency = "USD",
                     ReferralCode = "Test123",
                     ReferrerCode = "Test123",
                     UserID = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                     Status = StatusType.InActive,
                     CreatedOn =Convert.ToDateTime("2025-04-23T15:01:19.7396017Z"),
                     LastLogin = Convert.ToDateTime("2025-04-23T15:01:19.7396017Z"),
                     Roles = new List<string> { "User" },
                     EmailStatus = StatusType.Active,
                     Plan = "Starter"
                 }
                );

            modelBuilder.Entity<Asset>().HasData(
                new Asset
                {
                    AssetId = 1,
                    AssetName = "Bitcoin",
                    AssetSymbol = "BTC",
                    TradingView = "BITGET:BTCUSDT",
                    AssetType = "Crypto",
                    IsStar = true,
                },
                new Asset
                {
                    AssetId = 2,
                    AssetName = "Ethereum",
                    AssetSymbol = "ETH",
                    TradingView = "BITGET:ETHUSDT",
                    AssetType = "Crypto",
                    IsStar = true,
                },
                new Asset
                {
                    AssetId = 3,
                    AssetName = "United States Dollars",
                    AssetSymbol = "USD",
                    TradingView = "BITGET:LTCUSDT",
                    AssetType = "Fiat",
                    IsStar = true,
                },
                new Asset
                {
                    AssetId = 4,
                    AssetName = "Apple",
                    AssetSymbol = "AAPL",
                    TradingView = "BITGET:LTCUSDT",
                    AssetType = "Stock",
                    IsStar = true,
                }
                );

            modelBuilder.Entity<WalletAddress>().HasData(
                new WalletAddress
                {
                    WalletID = 1,
                    CoinName = "Bitcoin",
                    CoinType = "BTC",
                    Address = "0x1234567890abcdef1234567890abcdef12345678",
                    Network = "Blockchain"
                },
                new WalletAddress
                {
                    WalletID = 2,
                    CoinName = "Etherum",
                    CoinType = "ETH",
                    Address = "0xabcdef1234567890abcdef1234567890abcdef12",
                    Network = "Blockchain"
                }
            );

            modelBuilder.Entity<SignalPlan>().HasData(
                new SignalPlan
                {
                    PlanID = 1,
                    PlanName = "Starter",
                    Price = 100,
                    Strength = 10
                },
                new SignalPlan
                {
                    PlanID = 2,
                    PlanName = "Pro",
                    Price = 200,
                    Strength = 25
                }
            );

            modelBuilder.Entity<SMSPlan>().HasData(
                new SMSPlan
                {
                    PlanID = 1,
                    PlanName = "BitcoinPool12",
                    PlanSymbol = "BTC",
                    PlanType = SMSTypes.Staking,
                    MinimumAmount = 100,
                    MaximumAmount = 1000,
                    Cycle = 1,
                    ROI = 10,
                },
                new SMSPlan
                {
                    PlanID = 2,
                    PlanName = "Dogecoin",
                    PlanSymbol = "DOGE",
                    PlanType = SMSTypes.Mining,
                    MinimumAmount = 100,
                    MaximumAmount = 1000,
                    Cycle = 1,
                    ROI = 15,
                }
            );

            modelBuilder.Entity<ConnectWallet>().HasData(
                new ConnectWallet
                {
                    WalletID = 1,
                    WalletName = "Aktionariat Wallet",
                },
                new ConnectWallet
                {
                    WalletID = 2,
                    WalletName = "Binance",
                },
                new ConnectWallet
                {
                    WalletID = 3,
                    WalletName = "Bitcoin Wallet",
                },
                new ConnectWallet
                {
                    WalletID = 4,
                    WalletName = "Bitkeep Wallet",
                },
                new ConnectWallet
                {
                    WalletID = 5,
                    WalletName = "Bitpay",
                },
                new ConnectWallet
                {
                    WalletID = 6,
                    WalletName = "Blockchain",
                },
                new ConnectWallet
                {
                    WalletID = 7,
                    WalletName = "Coinbase",
                },
                new ConnectWallet
                {
                    WalletID = 8,
                    WalletName = "Coinbase One",
                },
                new ConnectWallet
                {
                    WalletID = 9,
                    WalletName = "Crypto Wallet",
                },
                new ConnectWallet
                {
                    WalletID = 10,
                    WalletName = "Exodus Wallet",
                },
                new ConnectWallet
                {
                    WalletID = 11,
                    WalletName = "Gemini",
                },
                new ConnectWallet
                {
                    WalletID = 12,
                    WalletName = "Imtoken",
                },
                new ConnectWallet
                {
                    WalletID = 13,
                    WalletName = "Infinito Wallet",
                },
                new ConnectWallet
                {
                    WalletID = 14,
                    WalletName = "Infinity Wallet",
                },
                new ConnectWallet
                {
                    WalletID = 15,
                    WalletName = "Keyringpro Wallet",
                },
                new ConnectWallet
                {
                    WalletID = 16,
                    WalletName = "Metamask",
                },
                new ConnectWallet
                {
                    WalletID = 17,
                    WalletName = "Ownbit Wallet",
                },
                new ConnectWallet
                {
                    WalletID = 18,
                    WalletName = "Phantom Wallet",
                },
                new ConnectWallet
                {
                    WalletID = 19,
                    WalletName = "Pulse Wallet",
                },
                new ConnectWallet
                {
                    WalletID = 20,
                    WalletName = "Rainbow",
                },
                new ConnectWallet
                {
                    WalletID = 21,
                    WalletName = "Robinhood Wallet",
                },
                new ConnectWallet
                {
                    WalletID = 22,
                    WalletName = "Robinhood Wallet",
                },
                new ConnectWallet
                {
                    WalletID = 23,
                    WalletName = "Sparkpoint Wallet",
                },
                new ConnectWallet
                {
                    WalletID = 24,
                    WalletName = "Trust Wallet",
                },
                new ConnectWallet
                {
                    WalletID = 25,
                    WalletName = "Uniswap",
                },
                new ConnectWallet
                {
                    WalletID = 26,
                    WalletName = "Wallet io",
                }
                );
        }
    }
}
