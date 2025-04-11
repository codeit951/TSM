using TSM.CoreBusiness;

namespace TSM.UseCase.Users
{
    public interface IUpdateTradeUseCase
    {
        Task Execute(Guid UserID, Trade trade);
    }
}