using TSM.CoreBusiness;

namespace TSM.UseCase.ConnectWallets
{
    public interface IViewConnectWalletsByNameUseCase
    {
        Task<List<ConnectWallet>> ExecuteAsync(string walletName = "");
    }
}