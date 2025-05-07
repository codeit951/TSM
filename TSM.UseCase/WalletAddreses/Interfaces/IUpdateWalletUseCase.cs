using TSM.CoreBusiness;

namespace TSM.UseCase.WalletAddreses
{
    public interface IUpdateWalletUseCase
    {
        Task<bool> ExecuteAsync(WalletAddress wallet);
    }
}