using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Users
{
    public class AddConnectedWalletUseCase : IAddConnectedWalletUseCase
    {
        private readonly IUserRepository userRepository;

        public AddConnectedWalletUseCase(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task ExecuteAsync(ConnectedWallet connectedWallet)
        {
            if (connectedWallet == null)
            {
                throw new ArgumentNullException(nameof(connectedWallet));
            }
            await userRepository.AddConnectedWalletAsync(connectedWallet);
        }
    }
}
