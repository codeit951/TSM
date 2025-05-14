using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Users
{
    public class RemoveConnectedWalletuseCase
    {
        private readonly IUserRepository userRepository;

        public RemoveConnectedWalletuseCase(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task ExecuteAsync(int connectedWalletID)
        {
            if (connectedWalletID <= 0)
            {
                throw new ArgumentException("Invalid connected wallet ID.", nameof(connectedWalletID));
            }
            await userRepository.RemoveConnectedWalletAsync(connectedWalletID);
        }
    }
}
