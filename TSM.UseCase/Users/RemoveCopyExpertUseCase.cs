using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Users
{
    public class RemoveCopyExpertUseCase : IRemoveCopyExpertUseCase
    {
        private readonly IUserRepository userRepository;
        public RemoveCopyExpertUseCase(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public async Task ExecuteAsync(int copyID)
        {
            if (copyID <= 0)
            {
                throw new ArgumentException("Invalid copy trader ID.", nameof(copyID));
            }
            await userRepository.RemoveCopyExpertAsync(copyID);
        }
    }
}
