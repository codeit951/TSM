using TSM.CoreBusiness;

namespace TSM.UseCase.SignalPlans
{
    public interface IUpdateSignalPlanUseCase
    {
        Task<bool> Execute(SignalPlan updatedPlan);
    }
}