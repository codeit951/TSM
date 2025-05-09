using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;

namespace TSM.UseCase.PluginInterfaces
{
    public interface ISignalPlanRepository
    {
        Task<bool> AddSignalPlanAsync(SignalPlan newPlan);
        Task<bool> DeleteSignalPlanByIdAsync(int id);
        Task<List<SignalPlan>> GetSignalPlansByNameAsync(string planName);
        Task<bool> UpdateSignalPlanAsync(SignalPlan updatedPlan);
    }
}
