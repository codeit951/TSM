using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;

namespace TSM.UseCase.PluginInterfaces
{
    public interface IConnectWalletRepository
    {
        Task AddConnectWalletAsync(ConnectWallet wallet);
        Task DeleteConnectWalletAsync(int walletId);
        Task<List<ConnectWallet>> GetConnectWalletByNameAsync(string walletName);
        Task UpdateConnectWalletAsync(ConnectWallet wallet);
    }
}
