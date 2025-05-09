using TSM.CoreBusiness;

namespace TSM.UseCase.SMSPlans
{
    public interface IViewSMSPlansByNameUseCase
    {
        Task<List<SMSPlan>> Execute(string planName = "");
    }
}