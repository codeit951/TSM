using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.CopyTraders
{
    public class AddCopyTraderUseCase : IAddCopyTraderUseCase
    {
        private readonly ICopyTraderRepository copyTraderRepository;

        public AddCopyTraderUseCase(ICopyTraderRepository copyTraderRepository)
        {
            this.copyTraderRepository = copyTraderRepository;
        }

        public async Task ExecuteAsync(CopyTrader copyTrader)
        {
            if (copyTrader == null)
            {
                throw new ArgumentNullException(nameof(copyTrader));
            }
            await copyTraderRepository.AddCopyTraderAsync(copyTrader);
        }
    }
}
