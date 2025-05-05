using TSM.CoreBusiness;

namespace TSM.UseCase.Users
{
    public interface ICloseTradeUseCase
    {
        Task ExecuteAsync(Trade trade, decimal closePrice, decimal profit, decimal loss);
    }
}