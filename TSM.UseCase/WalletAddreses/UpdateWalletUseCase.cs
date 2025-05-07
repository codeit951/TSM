using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.WalletAddreses
{
    public class UpdateWalletUseCase : IUpdateWalletUseCase
    {
        private readonly IWalletRepository walletRepository;

        public UpdateWalletUseCase(IWalletRepository walletRepository)
        {
            this.walletRepository = walletRepository;
        }

        public async Task<bool> ExecuteAsync(WalletAddress wallet)
        {
            if (wallet == null)
                return false;
            // Assuming the repository has an UpdateWalletAsync method
            return await walletRepository.UpdateWalletAsync(wallet);
        }
    }
}
