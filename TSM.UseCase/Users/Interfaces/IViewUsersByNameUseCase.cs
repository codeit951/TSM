using TSM.CoreBusiness;

namespace TSM.UseCase.Users
{
    public interface IViewUsersByNameUseCase
    {
        Task<List<User>> Execute(string name = "");
    }
}