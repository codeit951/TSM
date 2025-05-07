using TSM.CoreBusiness;

namespace TSM.UseCase.WalletAddreses
{
    public interface IAddWalletUseCase
    {
        Task<bool> ExecuteAsync(WalletAddress wallet);
    }
}