using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Assets
{
    public class ViewAssetByIdUseCase : IViewAssetByIdUseCase
    {
        private readonly IAssetsRepository assetsRepository;

        public ViewAssetByIdUseCase(IAssetsRepository assetsRepository)
        {
            this.assetsRepository = assetsRepository;
        }

        public async Task<Asset> Execute(int assetId)
        {
            return await assetsRepository.GetAssetsByID(assetId);
        }
    }
}
