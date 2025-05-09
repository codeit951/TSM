using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.UseCase.PluginInterfaces;

namespace TSM.UseCase.SMSPlans
{
    public class DeleteSMSPlanByIdUseCase : IDeleteSMSPlanByIdUseCase
    {
        private readonly ISMSPlanRepository planRepository;
        public DeleteSMSPlanByIdUseCase(ISMSPlanRepository planRepository)
        {
            this.planRepository = planRepository;
        }
        public async Task<bool> Execute(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(id), "ID must be greater than zero");
            }
            return await planRepository.DeleteSMSPlanByIdAsync(id);
        }
    }
}
