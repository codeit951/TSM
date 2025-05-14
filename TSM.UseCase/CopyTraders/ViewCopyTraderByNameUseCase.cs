using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.CopyTraders
{
    public class ViewCopyTraderByNameUseCase : IViewCopyTraderByNameUseCase
    {
        private readonly ICopyTraderRepository copyTraderRepository;
        public ViewCopyTraderByNameUseCase(ICopyTraderRepository copyTraderRepository)
        {
            this.copyTraderRepository = copyTraderRepository;
        }
        public async Task<List<CopyTrader>> ExecuteAsync(string name = "")
        {
            return await copyTraderRepository.GetCopyTraderByNameAsync(name);
        }
    }
}
