using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Users
{
    public class UpdateTradeUseCase : IUpdateTradeUseCase
    {
        private readonly IUserRepository userRepository;

        public UpdateTradeUseCase(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task Execute(Guid UserID, Trade trade)
        {
            if (trade == null)
            {
                throw new ArgumentNullException(nameof(trade));
            }
            await userRepository.UpdateTrade(UserID, trade);
        }
    }
}
