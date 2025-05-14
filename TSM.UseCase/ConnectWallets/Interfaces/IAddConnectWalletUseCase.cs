using TSM.CoreBusiness;

namespace TSM.UseCase.ConnectWallets
{
    public interface IAddConnectWalletUseCase
    {
        Task ExecuteAsync(ConnectWallet wallet);
    }
}