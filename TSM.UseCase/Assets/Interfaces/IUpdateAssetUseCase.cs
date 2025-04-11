using TSM.CoreBusiness;

namespace TSM.UseCase.Assets
{
    public interface IUpdateAssetUseCase
    {
        Task Execute(Asset asset);
    }
}