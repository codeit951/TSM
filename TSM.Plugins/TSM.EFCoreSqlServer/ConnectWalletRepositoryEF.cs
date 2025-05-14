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
    public class ConnectWalletRepositoryEF : IConnectWalletRepository
    {
        private readonly IDbContextFactory<TSMContext> contextFactory;

        public ConnectWalletRepositoryEF(IDbContextFactory<TSMContext> contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task AddConnectWalletAsync(ConnectWallet wallet)
        {
            await using var db= contextFactory.CreateDbContext();
            var existingWallet = await db.ConnectWallets
                .FirstOrDefaultAsync(w => w.WalletName == wallet.WalletName);
            if (existingWallet != null)
            {
                throw new InvalidOperationException($"Wallet with name {wallet.WalletName} already exists.");
            }
            db.ConnectWallets.Add(wallet);
            await db.SaveChangesAsync();
        }

        public async Task DeleteConnectWalletAsync(int walletId)
        {
            await using var db = contextFactory.CreateDbContext();
            var wallet = await db.ConnectWallets.FindAsync(walletId);
            if (wallet == null)
            {
                throw new InvalidOperationException($"Wallet with ID {walletId} not found.");
            }
            db.ConnectWallets.Remove(wallet);
            await db.SaveChangesAsync();
        }

        public async Task<List<ConnectWallet>> GetConnectWalletByNameAsync(string walletName)
        {
            await using var db = contextFactory.CreateDbContext();
            if (string.IsNullOrEmpty(walletName))
            {
                return await db.ConnectWallets.ToListAsync();
            }
            return await db.ConnectWallets
                .Where(w => w.WalletName.ToLower().IndexOf(walletName.ToLower())>=0)
                .ToListAsync();
        }

        public async Task UpdateConnectWalletAsync(ConnectWallet wallet)
        {
            await using var db = contextFactory.CreateDbContext();
            var existingWallet = await db.ConnectWallets.FindAsync(wallet.WalletID);
            if (existingWallet == null)
            {
                throw new InvalidOperationException($"Wallet with ID {wallet.WalletID} not found.");
            }
            existingWallet.WalletName = wallet.WalletName;
            await db.SaveChangesAsync();
        }
    }
}
