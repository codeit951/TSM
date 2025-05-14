
namespace TSM.UseCase.CopyTraders
{
    public interface IRemoveCopyTraderUseCase
    {
        Task ExecuteAsync(int copyTraderId);
    }
}