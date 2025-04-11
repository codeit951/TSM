
namespace TSM.UseCase.Assets
{
    public interface IDeleteAssetUseCase
    {
        Task Execute(int assetId);
    }
}