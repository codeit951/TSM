using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.SMSPlans
{
    public class UpdateSMSPlanUseCase : IUpdateSMSPlanUseCase
    {
        private readonly ISMSPlanRepository planRepository;

        public UpdateSMSPlanUseCase(ISMSPlanRepository planRepository)
        {
            this.planRepository = planRepository;
        }

        public async Task<bool> Execute(SMSPlan updatedPlan)
        {
            if (updatedPlan == null)
            {
                throw new ArgumentNullException(nameof(updatedPlan), "Updated plan cannot be null");
            }
            var existingPlans = await planRepository.GetSMSPlansByNameAsync(updatedPlan.PlanName);
            if (existingPlans.Count == 0)
            {
                return false; // No existing plan found with the same name
            }
            // Assuming the repository has an UpdateSMSPlanAsync method
            return await planRepository.UpdateSMSPlanAsync(updatedPlan);
        }
    }
}
