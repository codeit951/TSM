using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Users
{
    public class AddTransactionUseCase : IAddTransactionUseCase
    {
        private readonly IUserRepository userRepository;

        public AddTransactionUseCase(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task ExecuteAsync(Transaction transaction)
        {
            if (transaction == null)
            {
                throw new ArgumentNullException(nameof(transaction));
            }
            await userRepository.AddTransactionAsync(transaction);
        }
    }
}
