using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Users
{
    public class AddCopyExpertUseCase : IAddCopyExpertUseCase
    {
        private readonly IUserRepository userRepository;

        public AddCopyExpertUseCase(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task ExecuteAsync(CopiedExpert copyExpert)
        {
            if (copyExpert == null)
            {
                throw new ArgumentNullException(nameof(copyExpert));
            }
            await userRepository.AddCopyExpertAsync(copyExpert);
        }
    }
}
