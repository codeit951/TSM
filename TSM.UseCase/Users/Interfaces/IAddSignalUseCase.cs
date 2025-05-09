using TSM.CoreBusiness;

namespace TSM.UseCase.Users
{
    public interface IAddSignalUseCase
    {
        Task<string> Execute(Signal signal);
    }
}