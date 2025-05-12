using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Users
{
    public class CloseSMSUseCase : ICloseSMSUseCase
    {
        private readonly IUserRepository userRepository;

        public CloseSMSUseCase(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<bool> ExecuteAsync(SMS sms)
        {
            if (sms == null) return false;

            return await userRepository.CloseSMSAsync(sms);
        }
    }
}
