using TSM.CoreBusiness;

namespace TSM.UseCase.CopyTraders
{
    public interface IViewCopyTraderByNameUseCase
    {
        Task<List<CopyTrader>> ExecuteAsync(string name = "");
    }
}