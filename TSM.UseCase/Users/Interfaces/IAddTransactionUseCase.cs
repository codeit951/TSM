using TSM.CoreBusiness;

namespace TSM.UseCase.Users
{
    public interface IAddTransactionUseCase
    {
        Task ExecuteAsync(Transaction transaction);
    }
}