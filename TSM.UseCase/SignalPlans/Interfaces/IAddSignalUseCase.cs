using TSM.CoreBusiness;

namespace TSM.UseCase.SignalPlans
{
    public interface IAddSignalUseCase
    {
        Task<bool> Execute(SignalPlan newPlan);
    }
}