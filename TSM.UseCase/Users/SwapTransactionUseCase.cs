using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Users
{
    public class SwapTransactionUseCase : ISwapTransactionUseCase
    {
        private readonly IUserRepository userRepository;

        public SwapTransactionUseCase(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<string> Execute(Guid userID, Transaction transaction, string coinFrom, string coinTo, decimal amountFrom = 0.0m, decimal amountTo = 0.0m)
        {
            // Validate the input
            if (userID == Guid.Empty || transaction == null || coinFrom == null || coinTo == null)
            {
                throw new ArgumentException("Invalid user ID or transaction.");
            }
            // Add the trade to the user's account
            return await userRepository.AddSwapTransaction(userID, transaction, coinFrom, coinTo, amountFrom, amountTo);
        }
    }
}
