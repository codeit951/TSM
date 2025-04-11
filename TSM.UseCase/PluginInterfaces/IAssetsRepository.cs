using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;

namespace TSM.UseCase.PluginInterfaces
{
    public interface IAssetsRepository
    {
        Task AddAssets(Asset asset);
        Task DeleteAssets(int assetId);
        Task<Asset> GetAssetsByID(int assetId);
        Task<List<Asset>> GetAssetsByName(string assetName);
        Task UpdateAssets(Asset asset);
    }
}
