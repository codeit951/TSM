using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Users
{
    public class CloseTradeUseCase : ICloseTradeUseCase
    {
        private readonly IUserRepository userRepository;

        public CloseTradeUseCase(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task ExecuteAsync(Trade trade, decimal closePrice, decimal profit, decimal loss)
        {
            // Validate the trade
            if (trade == null)
            {
                throw new ArgumentNullException(nameof(trade), "Trade cannot be null");
            }

            await userRepository.CloseTrade(trade, closePrice, profit, loss);
        }
    }
}
