using TSM.CoreBusiness;

namespace TSM.UseCase.Users
{
    public interface ISwapTransactionUseCase
    {
        Task<string> Execute(Guid userID, Transaction transaction, string coinFrom, string coinTo, decimal amountFrom = 0.0M, decimal amountTo = 0.0M);
    }
}