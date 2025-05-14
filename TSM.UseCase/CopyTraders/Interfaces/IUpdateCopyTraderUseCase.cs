using TSM.CoreBusiness;

namespace TSM.UseCase.CopyTraders
{
    public interface IUpdateCopyTraderUseCase
    {
        Task ExecuteAsync(CopyTrader copyTrader);
    }
}