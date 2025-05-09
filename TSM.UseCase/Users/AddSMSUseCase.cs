using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.Users
{
    public class AddSMSUseCase : IAddSMSUseCase
    {
        private readonly IUserRepository userRepository;

        public AddSMSUseCase(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<string> ExecuteAsync(SMS sms)
        {
            if (sms == null)
            {
                throw new ArgumentNullException(nameof(sms), "plan cannot be null");
            }
            if (sms.UserID == Guid.Empty)
            {
                throw new ArgumentException("UserID cannot be empty", nameof(sms.UserID));
            }

            return await userRepository.AddSMSAsync(sms);
        }
    }
}
