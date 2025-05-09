using TSM.CoreBusiness;

namespace TSM.UseCase.SMSPlans
{
    public interface IViewSMSPlansByTypeUseCase
    {
        Task<List<SMSPlan>> Execute(SMSTypes type);
    }
}