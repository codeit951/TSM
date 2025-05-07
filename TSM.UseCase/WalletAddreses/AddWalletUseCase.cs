using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.WalletAddreses
{
    public class AddWalletUseCase : IAddWalletUseCase
    {
        private readonly IWalletRepository walletRepository;

        public AddWalletUseCase(IWalletRepository walletRepository)
        {
            this.walletRepository = walletRepository;
        }

        public async Task<bool> ExecuteAsync(WalletAddress wallet)
        {
            if (wallet == null)
                return false;

            return await walletRepository.AddWalletAsync(wallet);
        }
    }
}
