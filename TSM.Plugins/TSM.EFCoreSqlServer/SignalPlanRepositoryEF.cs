using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.EFCoreSqlServer
{
    public class SignalPlanRepositoryEF : ISignalPlanRepository
    {
        private readonly IDbContextFactory<TSMContext> contextFactory;

        public SignalPlanRepositoryEF(IDbContextFactory<TSMContext> contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<bool> AddSignalPlanAsync(SignalPlan newPlan)
        {
            try
            {
                await using var context = contextFactory.CreateDbContext();
                context.SignalPlans?.Add(newPlan);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false; // Handle exceptions as needed
            }
        }

        public async Task<bool> DeleteSignalPlanByIdAsync(int id)
        {
            try
            {
                await using var context = contextFactory.CreateDbContext();
                var plan = await context.SignalPlans.FindAsync(id);
                if (plan == null)
                {
                    return false; // Plan not found
                }
                context.SignalPlans.Remove(plan);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false; // Handle exceptions as needed
            }
        }

        public async Task<List<SignalPlan>> GetSignalPlansByNameAsync(string planName)
        {
            await using var db = this.contextFactory.CreateDbContext();
            return await db.SignalPlans.Where(a => a.PlanName.ToLower().IndexOf(planName.ToLower()) >= 0).ToListAsync();
        }

        public async Task<bool> UpdateSignalPlanAsync(SignalPlan updatedPlan)
        {
            await using var db = this.contextFactory.CreateDbContext();
            var existingPlan = await db.SignalPlans.FindAsync(updatedPlan.PlanID);
            if (existingPlan != null)
            {
                existingPlan.PlanName = updatedPlan.PlanName;
                existingPlan.Price = updatedPlan.Price;
                existingPlan.Strength = updatedPlan.Strength;
                await db.SaveChangesAsync();
                return true;
            }
            else
            {
                return false; // Plan not found
            }
        }
    }
}
