using TSM.CoreBusiness;

namespace TSM.UseCase.Users
{
    public interface IAddCopyExpertUseCase
    {
        Task ExecuteAsync(CopiedExpert copyExpert);
    }
}