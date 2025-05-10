using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.SignalPlans
{
    public class AddSignalPlanUseCase : IAddSignalPlanUseCase
    {
        private readonly ISignalPlanRepository planRepository;

        public AddSignalPlanUseCase(ISignalPlanRepository planRepository)
        {
            this.planRepository = planRepository;
        }

        public async Task<bool> Execute(SignalPlan newPlan)
        {
            if (newPlan == null)
            {
                throw new ArgumentNullException(nameof(newPlan), "New plan cannot be null");
            }

            // Assuming the repository has an AddSignalPlanAsync method
            return await planRepository.AddSignalPlanAsync(newPlan);
        }
    }
}
