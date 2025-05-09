using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;

namespace TSM.UseCase.PluginInterfaces
{
    public interface IUserRepository
    {
        Task<string> AddSignalAsync(Signal signal);
        Task<string> AddSMSAsync(SMS sms);
        Task<string> AddSwapTransaction(Guid userID, Transaction transaction, string coinFrom, string coinTo, decimal amountFrom, decimal amountTo);
        Task<string> AddTrade(Guid userID, Trade trade);
        Task AddTransactionAsync(Transaction transaction);
        Task CloseTrade(Trade trade, decimal closePrice, decimal profit, decimal loss);
        Task<List<User>> GetUsersByName(string name);
        Task UpdateTrade(Guid userID, Trade trade);
        Task UpdateUserBalance(Guid userID, List<Balance> balances);
        Task UseNowPayAsync(Transaction transaction);
    }
}
