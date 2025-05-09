using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Users
{
    public class AddSignalUseCase : IAddSignalUseCase
    {
        private readonly IUserRepository userRepository;

        public AddSignalUseCase(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<string> Execute(Signal signal)
        {
            if (signal == null)
            {
                throw new ArgumentNullException(nameof(signal), "signal cannot be null");
            }
            // Assuming the repository has an AddSignalPlanAsync method
            return await userRepository.AddSignalAsync(signal);
        }
    }
}
