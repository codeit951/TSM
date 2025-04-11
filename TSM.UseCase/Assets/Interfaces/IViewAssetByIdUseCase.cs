using TSM.CoreBusiness;

namespace TSM.UseCase.Assets
{
    public interface IViewAssetByIdUseCase
    {
        Task<Asset> Execute(int assetId);
    }
}