using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Assets
{
    public class AddAssetsUseCase : IAddAssetsUseCase
    {
        private readonly IAssetsRepository assetsRepository;

        public AddAssetsUseCase(IAssetsRepository assetsRepository)
        {
            this.assetsRepository = assetsRepository;
        }

        public async Task Execute(Asset asset)
        {
            if (asset == null)
            {
                throw new ArgumentNullException(nameof(asset));
            }
            await assetsRepository.AddAssets(asset);
        }
    }
}
