using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.WalletAddreses
{
    public class ViewWalletByNameUseCase : IViewWalletByNameUseCase
    {
        private readonly IWalletRepository walletRepository;

        public ViewWalletByNameUseCase(IWalletRepository walletRepository)
        {
            this.walletRepository = walletRepository;
        }

        public async Task<List<WalletAddress>> ExecuteAsync(string walletName = "")
        {
            return await walletRepository.GetAllWalletsAsync(walletName);
        }
    }
}
