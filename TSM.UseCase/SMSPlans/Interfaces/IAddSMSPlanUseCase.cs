using TSM.CoreBusiness;

namespace TSM.UseCase.SMSPlans
{
    public interface IAddSMSPlanUseCase
    {
        Task<bool> Execute(SMSPlan newPlan);
    }
}