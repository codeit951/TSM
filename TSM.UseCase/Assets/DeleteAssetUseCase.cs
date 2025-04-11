using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Assets
{
    public class DeleteAssetUseCase : IDeleteAssetUseCase
    {
        private readonly IAssetsRepository assetsRepository;
        public DeleteAssetUseCase(IAssetsRepository assetsRepository)
        {
            this.assetsRepository = assetsRepository;
        }
        public async Task Execute(int assetId)
        {
            if (assetId <= 0)
            {
                throw new ArgumentException("Invalid asset ID", nameof(assetId));
            }
            await assetsRepository.DeleteAssets(assetId);
        }
    }
}
