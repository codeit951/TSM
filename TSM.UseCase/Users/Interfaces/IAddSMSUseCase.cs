using TSM.CoreBusiness;

namespace TSM.UseCase.Users
{
    public interface IAddSMSUseCase
    {
        Task<string> ExecuteAsync(SMS sms);
    }
}