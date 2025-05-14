using TSM.CoreBusiness;

namespace TSM.UseCase.CopyTraders
{
    public interface IAddCopyTraderUseCase
    {
        Task ExecuteAsync(CopyTrader copyTrader);
    }
}