using TSM.CoreBusiness;

namespace TSM.UseCase.Assets
{
    public interface IViewAssetsByNameUseCase
    {
        Task<List<Asset>> Execute(string assetName = "");
    }
}