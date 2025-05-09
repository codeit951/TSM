using TSM.CoreBusiness;

namespace TSM.UseCase.SignalPlans
{
    public interface IViewSignalsByNameUseCase
    {
        Task<List<SignalPlan>> Execute(string planName = "");
    }
}