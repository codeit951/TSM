
namespace TSM.UseCase.WalletAddreses
{
    public interface IDeleteWalletByIdUseCase
    {
        Task<bool> ExecuteAsync(int walletId);
    }
}