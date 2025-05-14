using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.ConnectWallets
{
    public class UpdateConnectWalletUseCase : IUpdateConnectWalletUseCase
    {
        private readonly IConnectWalletRepository connectWallet;

        public UpdateConnectWalletUseCase(IConnectWalletRepository connectWallet)
        {
            this.connectWallet = connectWallet;
        }

        public async Task ExecuteAsync(ConnectWallet wallet)
        {
            if (wallet == null)
            {
                throw new ArgumentNullException(nameof(wallet));
            }
            if (string.IsNullOrEmpty(wallet.WalletName))
            {
                throw new ArgumentException("Wallet name cannot be null or empty.", nameof(wallet.WalletName));
            }
            await connectWallet.UpdateConnectWalletAsync(wallet);
        }
    }
}
