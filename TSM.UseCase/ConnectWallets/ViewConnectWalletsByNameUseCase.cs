using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.ConnectWallets
{
    public class ViewConnectWalletsByNameUseCase : IViewConnectWalletsByNameUseCase
    {
        private readonly IConnectWalletRepository connectWallet;

        public ViewConnectWalletsByNameUseCase(IConnectWalletRepository connectWallet)
        {
            this.connectWallet = connectWallet;
        }

        public async Task<List<ConnectWallet>> ExecuteAsync(string walletName = "")
        {
            return await connectWallet.GetConnectWalletByNameAsync(walletName);
        }
    }
}
