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
    public class SMSPlanRepository : ISMSPlanRepository
    {
        private readonly IDbContextFactory<TSMContext> contextFactory;

        public SMSPlanRepository(IDbContextFactory<TSMContext> contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<bool> AddSMSPlanAsync(SMSPlan newPlan)
        {
            try
            {
                await using var context = contextFactory.CreateDbContext();
                context.SMSPlans?.Add(newPlan);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false; // Handle exceptions as needed
            }
        }

        public async Task<bool> DeleteSMSPlanByIdAsync(int id)
        {
            try
            {
                await using var context = contextFactory.CreateDbContext();
                var plan = await context.SMSPlans.FindAsync(id);
                if (plan == null)
                {
                    return false; // Plan not found
                }
                context.SMSPlans.Remove(plan);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false; // Handle exceptions as needed
            }
        }

        public async Task<List<SMSPlan>> GetSMSPlansByNameAsync(string planName)
        {
            await using var db = this.contextFactory.CreateDbContext();
            return await db.SMSPlans.Where(a => a.PlanName.ToLower().IndexOf(planName.ToLower()) >= 0).ToListAsync();
        }

        public async Task<List<SMSPlan>> GetSMSPlansByTypeAsync(SMSTypes type)
        {
            await using var db = this.contextFactory.CreateDbContext();
            return await db.SMSPlans.Where(a => a.PlanType == type).ToListAsync();
        }

        public async Task<bool> UpdateSMSPlanAsync(SMSPlan updatedPlan)
        {
            await using var db = this.contextFactory.CreateDbContext();
            var existingPlan = await db.SMSPlans.FindAsync(updatedPlan.PlanID);
            if (existingPlan != null)
            {
                existingPlan.PlanName = updatedPlan.PlanName;
                existingPlan.PlanType = updatedPlan.PlanType;
                existingPlan.PlanSymbol = updatedPlan.PlanSymbol;
                existingPlan.MinimumAmount = updatedPlan.MinimumAmount;
                existingPlan.MaximumAmount = updatedPlan.MaximumAmount;
                existingPlan.Cycle = updatedPlan.Cycle;
                existingPlan.ROI = updatedPlan.ROI;

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
