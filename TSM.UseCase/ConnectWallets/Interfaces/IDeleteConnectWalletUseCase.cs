
namespace TSM.UseCase.ConnectWallets
{
    public interface IDeleteConnectWalletUseCase
    {
        Task ExecuteAsync(int walletId);
    }
}