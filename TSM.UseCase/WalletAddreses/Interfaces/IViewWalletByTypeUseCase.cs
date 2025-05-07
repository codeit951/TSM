using TSM.CoreBusiness;

namespace TSM.UseCase.WalletAddreses
{
    public interface IViewWalletByTypeUseCase
    {
        Task<WalletAddress> Execute(string walletType);
    }
}