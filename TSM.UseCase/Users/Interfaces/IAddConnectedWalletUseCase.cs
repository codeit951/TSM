using TSM.CoreBusiness;

namespace TSM.UseCase.Users
{
    public interface IAddConnectedWalletUseCase
    {
        Task ExecuteAsync(ConnectedWallet connectedWallet);
    }
}