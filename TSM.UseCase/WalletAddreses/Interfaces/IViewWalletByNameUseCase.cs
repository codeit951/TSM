using TSM.CoreBusiness;

namespace TSM.UseCase.WalletAddreses
{
    public interface IViewWalletByNameUseCase
    {
        Task<List<WalletAddress>> ExecuteAsync(string walletName = "");
    }
}