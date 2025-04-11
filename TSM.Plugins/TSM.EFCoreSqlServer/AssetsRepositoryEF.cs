using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.EFCoreSqlServer
{
    public class AssetsRepositoryEF : IAssetsRepository
    {
        private readonly TSMContext db;

        public AssetsRepositoryEF(TSMContext db)
        {
            this.db = db;
        }
        public async Task AddAssets(Asset asset)
        {
            db.Assets?.Add(asset);
            await db.SaveChangesAsync();
           
        }

        public async Task DeleteAssets(int assetId)
        {
            var existingAsset = await db.Assets.FindAsync(assetId);
            if (existingAsset != null)
            {
                db.Assets?.Remove(existingAsset);
                await db.SaveChangesAsync();
            }
        }

        public async Task<Asset> GetAssetsByID(int assetId)
        {
            return await db.Assets.FindAsync(assetId);
        }

        public async Task<List<Asset>> GetAssetsByName(string assetName)
        {
            return await db.Assets.Where(a=>a.AssetName.ToLower().IndexOf(assetName.ToLower()) >= 0|| a.AssetSymbol.ToLower().IndexOf(assetName.ToLower()) >= 0).ToListAsync();
        }

        public async Task UpdateAssets(Asset asset)
        {
            var existingAsset = await db.Assets.FindAsync(asset.AssetId);
            if (existingAsset != null)
            {
                existingAsset.AssetName = asset.AssetName;
                existingAsset.AssetSymbol = asset.AssetSymbol;
                existingAsset.TradingView = asset.TradingView;
                existingAsset.AssetType = asset.AssetType;
                existingAsset.IsStar = asset.IsStar;
                existingAsset.Status = asset.Status;
                existingAsset.SpotLeverage = asset.SpotLeverage;
                existingAsset.MarginLeverage = asset.MarginLeverage;
                existingAsset.FutureLeverage = asset.FutureLeverage;

                await db.SaveChangesAsync();
            }
        }
    }
}
