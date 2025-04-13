using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Users
{
    public class GetUserByEmailUseCase : IGetUserByEmailUseCase
    {
        private readonly IUserRepository userRepository;

        public GetUserByEmailUseCase(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<User?> Execute(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentNullException(nameof(email));
            }
            return await userRepository.GetByEmailAsync(email);
        }
    }
}
