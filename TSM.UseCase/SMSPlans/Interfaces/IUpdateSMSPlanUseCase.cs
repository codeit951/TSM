using TSM.CoreBusiness;

namespace TSM.UseCase.SMSPlans
{
    public interface IUpdateSMSPlanUseCase
    {
        Task<bool> Execute(SMSPlan updatedPlan);
    }
}