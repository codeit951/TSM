using TSM.CoreBusiness;

namespace TSM.UseCase.Users
{
    public interface IAddTradeUseCase
    {
        Task<string> Execute(Guid UserID, Trade trade);
    }
}