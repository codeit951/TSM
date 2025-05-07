using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.WalletAddreses
{
    public class ViewWalletByTypeUseCase : IViewWalletByTypeUseCase
    {
        private readonly IWalletRepository walletRepository;

        public ViewWalletByTypeUseCase(IWalletRepository walletRepository)
        {
            this.walletRepository = walletRepository;
        }

        public async Task<WalletAddress> Execute(string walletType)
        {
            if (string.IsNullOrEmpty(walletType))
                throw new ArgumentException("Wallet type cannot be null or empty.", nameof(walletType));
            return await walletRepository.GetWalletsByType(walletType);
        }
    }
}
