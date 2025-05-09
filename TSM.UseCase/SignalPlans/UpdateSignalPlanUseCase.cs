using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.SignalPlans
{
    public class UpdateSignalPlanUseCase : IUpdateSignalPlanUseCase
    {
        private readonly ISignalPlanRepository planRepository;

        public UpdateSignalPlanUseCase(ISignalPlanRepository planRepository)
        {
            this.planRepository = planRepository;
        }

        public async Task<bool> Execute(SignalPlan updatedPlan)
        {
            if (updatedPlan == null)
            {
                throw new ArgumentNullException(nameof(updatedPlan), "Updated plan cannot be null");
            }
            var existingPlans = await planRepository.GetSignalPlansByNameAsync(updatedPlan.PlanName);
            if (existingPlans.Count == 0)
            {
                return false; // No existing plan found with the same name
            }
            // Assuming the repository has an UpdateSignalPlanAsync method
            return await planRepository.UpdateSignalPlanAsync(updatedPlan);
        }
    }
}
