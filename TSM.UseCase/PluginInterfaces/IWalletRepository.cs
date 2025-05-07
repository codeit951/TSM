using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;

namespace TSM.UseCase.PluginInterfaces
{
    public interface IWalletRepository
    {
        Task<bool> AddWalletAsync(WalletAddress wallet);
        Task<bool> DeleteWalletByIdAsync(int walletId);
        Task<List<WalletAddress>> GetAllWalletsAsync(string walletName);
        Task<WalletAddress> GetWalletsByType(string walletType);
        Task<bool> UpdateWalletAsync(WalletAddress wallet);
    }
}
