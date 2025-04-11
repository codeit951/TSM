using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Users
{
    public class UpdateUserBalanceUseCase : IUpdateUserBalanceUseCase
    {
        private readonly IUserRepository userRepository;

        public UpdateUserBalanceUseCase(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task ExecuteAsync(Guid UserID, List<Balance> balances)
        {
            if (balances == null)
            {
                throw new ArgumentNullException(nameof(balances));
            }
            await userRepository.UpdateUserBalance(UserID, balances);

        }
    }
}
