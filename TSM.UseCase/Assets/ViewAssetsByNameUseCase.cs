using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Assets
{
    public class ViewAssetsByNameUseCase : IViewAssetsByNameUseCase
    {
        private readonly IAssetsRepository assetsRepository;

        public ViewAssetsByNameUseCase(IAssetsRepository assetsRepository)
        {
            this.assetsRepository = assetsRepository;
        }

        public async Task<List<Asset>> Execute(string assetName = "")
        {
            return await assetsRepository.GetAssetsByName(assetName);
        }
    }
}
