using TSM.CoreBusiness;

namespace TSM.UseCase.Users
{
    public interface IGetUserByEmailUseCase
    {
        Task<User?> Execute(string email);
    }
}