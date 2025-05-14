using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.CopyTraders
{
    public class RemoveCopyTraderUseCase : IRemoveCopyTraderUseCase
    {
        private readonly ICopyTraderRepository copyTraderRepository;

        public RemoveCopyTraderUseCase(ICopyTraderRepository copyTraderRepository)
        {
            this.copyTraderRepository = copyTraderRepository;
        }

        public async Task ExecuteAsync(int copyTraderId)
        {
            if (copyTraderId <= 0)
            {
                throw new ArgumentException("Invalid copy trader ID.", nameof(copyTraderId));
            }
            await copyTraderRepository.RemoveCopyTraderAsync(copyTraderId);
        }
    }
}
