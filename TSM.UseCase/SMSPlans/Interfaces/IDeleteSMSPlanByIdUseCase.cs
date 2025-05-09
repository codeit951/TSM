
namespace TSM.UseCase.SMSPlans
{
    public interface IDeleteSMSPlanByIdUseCase
    {
        Task<bool> Execute(int id);
    }
}