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
        Task<string> AddTrade(Guid userID, Trade trade);
        Task<List<User>> GetUsersByName(string name);
        Task UpdateTrade(Guid userID, Trade trade);
        Task UpdateUserBalance(Guid userID, List<Balance> balances);
    }
}
