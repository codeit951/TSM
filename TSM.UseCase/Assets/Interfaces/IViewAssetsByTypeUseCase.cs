using TSM.CoreBusiness;

namespace TSM.UseCase.Assets
{
    public interface IViewAssetsByTypeUseCase
    {
        Task<List<Asset>> ExecuteAsync(string assetType);
    }
}