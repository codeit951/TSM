using TSM.CoreBusiness;

namespace TSM.UseCase.Users
{
    public interface IUpdateUserBalanceUseCase
    {
        Task ExecuteAsync(Guid UserID, List<Balance> balances);
    }
}