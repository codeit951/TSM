using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.SMSPlans
{
    public class ViewSMSPlansByTypeUseCase : IViewSMSPlansByTypeUseCase
    {
        private readonly ISMSPlanRepository planRepository;
        public ViewSMSPlansByTypeUseCase(ISMSPlanRepository planRepository)
        {
            this.planRepository = planRepository;
        }
        public async Task<List<SMSPlan>> Execute(SMSTypes type)
        {

            return await planRepository.GetSMSPlansByTypeAsync(type);
        }
    }
}
