using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.SMSPlans
{
    public class ViewSMSPlansByNameUseCase : IViewSMSPlansByNameUseCase
    {
        private readonly ISMSPlanRepository planRepository;

        public ViewSMSPlansByNameUseCase(ISMSPlanRepository planRepository)
        {
            this.planRepository = planRepository;
        }

        public async Task<List<SMSPlan>> Execute(string planName = "")
        {
            return await planRepository.GetSMSPlansByNameAsync(planName);
        }
    }
}
