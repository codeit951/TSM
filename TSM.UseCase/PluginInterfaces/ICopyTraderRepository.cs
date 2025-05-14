using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;

namespace TSM.UseCase.PluginInterfaces
{
    public interface ICopyTraderRepository
    {
        Task AddCopyTraderAsync(CopyTrader copyTrader);
        Task<List<CopyTrader>> GetCopyTraderByNameAsync(string name);
        Task RemoveCopyTraderAsync(int copyTraderId);
        Task UpdateCopyTraderAsync(CopyTrader copyTrader);
    }
}
