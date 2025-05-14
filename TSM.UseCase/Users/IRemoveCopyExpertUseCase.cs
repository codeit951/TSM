
namespace TSM.UseCase.Users
{
    public interface IRemoveCopyExpertUseCase
    {
        Task ExecuteAsync(int copyID);
    }
}