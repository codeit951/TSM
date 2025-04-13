using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;

namespace TSM.EFCoreSqlServer
{
    public class TSMContext2 : DbContext
    {
        public TSMContext2(DbContextOptions<TSMContext2> options) : base(options)
        {

        }
        public DbSet<User>? Users { get; set; }
        public DbSet<Trade>? Trades { get; set; }
        public DbSet<Balance>? Balances { get; set; }
        public DbSet<Asset>? Assets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Trade>()
                .HasKey(t => new { t.OrderID, t.UserID });

            //modelBuilder.Entity<Balance>()
            //    .HasKey(b => new { b.BalanceId, b.UserId,b.AssetId });

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

        }
    }
}
