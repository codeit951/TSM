using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Users
{
    public class AddTradeUseCase : IAddTradeUseCase
    {
        private readonly IUserRepository userRepository;

        public AddTradeUseCase(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<string> Execute(Guid UserID, Trade trade)
        {
            if (trade == null)
            {
                throw new ArgumentNullException(nameof(trade));
            }
            return await userRepository.AddTrade(UserID, trade);
        }
    }
}
