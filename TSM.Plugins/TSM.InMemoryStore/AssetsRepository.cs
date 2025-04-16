using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.InMemoryStore
{
    public class AssetsRepository /*: IAssetsRepository*/
    {
        private List<Asset> assets;
        public AssetsRepository()
        {
            assets = new List<Asset>()
            {
                new Asset
                {
                    AssetId = 1,
                    AssetName = "Bitcoin",
                    AssetSymbol = "BTC",
                    TradingView = "BITGET:BTCUSDT",
                    AssetType = "Crypto",
                    IsStar = true,
                },
                new Asset
                {
                    AssetId = 2,
                    AssetName = "Ethereum",
                    AssetSymbol = "ETH",
                    TradingView = "BITGET:ETHUSDT",
                    AssetType = "Crypto",
                    IsStar = true,
                },
                new Asset
                {
                    AssetId = 3,
                    AssetName = "United States Dollars",
                    AssetSymbol = "USD",
                    TradingView = "BITGET:LTCUSDT",
                    AssetType = "Fiat",
                    IsStar = true,
                },
                new Asset
                {
                    AssetId = 4,
                    AssetName = "Apple",
                    AssetSymbol = "AAPL",
                    TradingView = "BITGET:LTCUSDT",
                    AssetType = "Crypto",
                    IsStar = true,
                },
            };
        }

        public Task AddAssets(Asset asset)
        {
            if (asset == null)
                throw new ArgumentNullException(nameof(asset));
            asset.AssetId = assets.Max(a => a.AssetId) + 1;
            assets.Add(asset);
            return Task.CompletedTask;
        }

        public Task DeleteAssets(int assetId)
        {
            var asset = assets.FirstOrDefault(a => a.AssetId == assetId);
            if (asset != null)
            {
                assets.Remove(asset);
            }
            return Task.CompletedTask;
        }

        public Task<Asset> GetAssetsByID(int assetId)
        {
            var asset = assets.FirstOrDefault(a => a.AssetId == assetId);
            if (asset == null)
                throw new ArgumentNullException(nameof(asset));
            return Task.FromResult(asset);
        }

        public Task<List<Asset>> GetAssetsByName(string assetName)
        {
            if (string.IsNullOrEmpty(assetName))
            {
                return Task.FromResult(assets);
            }
            else
            {
                var filteredAssets = assets.Where(a => a.AssetName.ToLower().Contains(assetName.ToLower())).ToList();
                return Task.FromResult(filteredAssets);
            }
        }

        public Task UpdateAssets(Asset asset)
        {
            if (asset == null)
                throw new ArgumentNullException(nameof(asset));
            var existingAsset = assets.FirstOrDefault(a => a.AssetId == asset.AssetId);
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
            }
            return Task.CompletedTask;
        }
    }
}
