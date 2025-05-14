using TSM.CoreBusiness;

namespace TSM.UseCase.ConnectWallets
{
    public interface IUpdateConnectWalletUseCase
    {
        Task ExecuteAsync(ConnectWallet wallet);
    }
}