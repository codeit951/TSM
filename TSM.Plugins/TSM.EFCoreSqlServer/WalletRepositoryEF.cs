using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.EFCoreSqlServer
{
    public class WalletRepositoryEF : IWalletRepository
    {
        private readonly IDbContextFactory<TSMContext> contextFactory;

        public WalletRepositoryEF(IDbContextFactory<TSMContext> contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<bool> AddWalletAsync(WalletAddress wallet)
        {
            await using var context = await contextFactory.CreateDbContextAsync();
            try
            {
                context.WalletAddresses?.Add(wallet);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> DeleteWalletByIdAsync(int walletId)
        {
            await using var db = await contextFactory.CreateDbContextAsync();
            var existingWallet = await db.WalletAddresses.FindAsync(walletId);
            if (existingWallet != null)
            {
                db.WalletAddresses?.Remove(existingWallet);
                await db.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<List<WalletAddress>> GetAllWalletsAsync(string walletName)
        {
            await using var context = contextFactory.CreateDbContext();
            return await context.WalletAddresses
                .Where(w => w.CoinType.ToLower().IndexOf(walletName.ToLower()) >= 0 || w.CoinName.ToLower().IndexOf(walletName.ToLower()) >= 0)
                .ToListAsync();
        }

        public async Task<WalletAddress> GetWalletsByType(string walletType)
        {
            await using var context = contextFactory.CreateDbContext();
            return await context.WalletAddresses
                .Where(w => w.CoinType.ToLower() == walletType)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateWalletAsync(WalletAddress wallet)
        {
            await using var context = await contextFactory.CreateDbContextAsync();
            try
            {
                var existingWallet = await context.WalletAddresses.FindAsync(wallet.WalletID);
                if (existingWallet != null)
                {
                    existingWallet.CoinName = wallet.CoinName;
                    existingWallet.CoinType = wallet.CoinType;
                    existingWallet.Address = wallet.Address;
                    existingWallet.Network = wallet.Network;
                    existingWallet.Status = wallet.Status;
                    await context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
