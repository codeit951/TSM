using TSM.CoreBusiness;

namespace TSM.UseCase.Assets
{
    public interface IAddAssetsUseCase
    {
        Task Execute(Asset asset);
    }
}