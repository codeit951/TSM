using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;

namespace TSM.UseCase.PluginInterfaces
{
    public interface ISMSPlanRepository
    {
        Task<bool> AddSMSPlanAsync(SMSPlan newPlan);
        Task<bool> DeleteSMSPlanByIdAsync(int id);
        Task<List<SMSPlan>> GetSMSPlansByNameAsync(string planName);
        Task<List<SMSPlan>> GetSMSPlansByTypeAsync(SMSTypes type);
        Task<bool> UpdateSMSPlanAsync(SMSPlan updatedPlan);
    }
}
