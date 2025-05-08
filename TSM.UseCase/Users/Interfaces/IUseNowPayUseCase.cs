using TSM.CoreBusiness;

namespace TSM.UseCase.Users
{
    public interface IUseNowPayUseCase
    {
        Task ExecuteAsync(Transaction transaction);
    }
}