using TSM.CoreBusiness;

namespace TSM.UseCase.Users
{
    public interface ICloseSMSUseCase
    {
        Task<bool> ExecuteAsync(SMS sms);
    }
}