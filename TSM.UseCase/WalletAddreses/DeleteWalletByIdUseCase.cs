using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.WalletAddreses
{
    public class DeleteWalletByIdUseCase : IDeleteWalletByIdUseCase
    {
        private readonly IWalletRepository walletRepository;

        public DeleteWalletByIdUseCase(IWalletRepository walletRepository)
        {
            this.walletRepository = walletRepository;
        }

        public async Task<bool> ExecuteAsync(int walletId)
        {
            if (walletId <= 0)
                throw new ArgumentException("Wallet ID must be greater than zero.", nameof(walletId));
            return await walletRepository.DeleteWalletByIdAsync(walletId);
        }
    }
}
