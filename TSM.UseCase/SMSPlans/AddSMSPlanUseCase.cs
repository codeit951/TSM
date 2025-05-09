using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.SMSPlans
{
    public class AddSMSPlanUseCase : IAddSMSPlanUseCase
    {
        private readonly ISMSPlanRepository planRepository;

        public AddSMSPlanUseCase(ISMSPlanRepository planRepository)
        {
            this.planRepository = planRepository;
        }

        public async Task<bool> Execute(SMSPlan newPlan)
        {
            if (newPlan == null)
            {
                throw new ArgumentNullException(nameof(newPlan), "New plan cannot be null");
            }
            return await planRepository.AddSMSPlanAsync(newPlan);
        }
    }
}
