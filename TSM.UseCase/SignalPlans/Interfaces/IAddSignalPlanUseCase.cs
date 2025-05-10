using TSM.CoreBusiness;

namespace TSM.UseCase.SignalPlans
{
    public interface IAddSignalPlanUseCase
    {
        Task<bool> Execute(SignalPlan newPlan);
    }
}