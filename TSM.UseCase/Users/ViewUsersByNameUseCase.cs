using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Users
{
    public class ViewUsersByNameUseCase : IViewUsersByNameUseCase
    {
        private readonly IUserRepository userRepository;

        public ViewUsersByNameUseCase(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<List<User>> Execute(string name = "")
        {

            return await userRepository.GetUsersByName(name);
        }
    }
}
