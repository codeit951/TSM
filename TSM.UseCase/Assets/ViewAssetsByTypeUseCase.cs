using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Assets
{
    public class ViewAssetsByTypeUseCase : IViewAssetsByTypeUseCase
    {
        private readonly IAssetsRepository assetsRepository;

        public ViewAssetsByTypeUseCase(IAssetsRepository assetsRepository)
        {
            this.assetsRepository = assetsRepository;
        }

        public async Task<List<Asset>> ExecuteAsync(string assetType)
        {
            if (string.IsNullOrEmpty(assetType))
            {
                throw new ArgumentNullException(nameof(assetType));
            }
            return await assetsRepository.GetAssetsByType(assetType);
        }
    }
}
