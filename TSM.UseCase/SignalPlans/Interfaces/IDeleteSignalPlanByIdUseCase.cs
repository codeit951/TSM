
namespace TSM.UseCase.SignalPlans
{
    public interface IDeleteSignalPlanByIdUseCase
    {
        Task<bool> Execute(int id);
    }
}