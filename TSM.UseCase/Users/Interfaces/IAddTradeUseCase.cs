using TSM.CoreBusiness;

namespace TSM.UseCase.Users
{
    public interface IAddTradeUseCase
    {
        Task Execute(Guid UserID, Trade trade);
    }
}