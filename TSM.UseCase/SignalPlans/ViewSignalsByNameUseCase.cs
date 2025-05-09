using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.SignalPlans
{
    public class ViewSignalsByNameUseCase : IViewSignalsByNameUseCase
    {
        private readonly ISignalPlanRepository planRepository;

        public ViewSignalsByNameUseCase(ISignalPlanRepository planRepository)
        {
            this.planRepository = planRepository;
        }

        public async Task<List<SignalPlan>> Execute(string planName = "")
        {
            return await planRepository.GetSignalPlansByNameAsync(planName);
        }
    }
}
