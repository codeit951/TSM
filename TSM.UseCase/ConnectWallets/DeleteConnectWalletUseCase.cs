using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.ConnectWallets
{
    public class DeleteConnectWalletUseCase : IDeleteConnectWalletUseCase
    {
        private readonly IConnectWalletRepository connectWallet;
        public DeleteConnectWalletUseCase(IConnectWalletRepository connectWallet)
        {
            this.connectWallet = connectWallet;
        }
        public async Task ExecuteAsync(int walletId)
        {
            if (walletId <= 0)
            {
                throw new ArgumentException("Invalid wallet ID.", nameof(walletId));
            }
            await connectWallet.DeleteConnectWalletAsync(walletId);
        }
    }
}
