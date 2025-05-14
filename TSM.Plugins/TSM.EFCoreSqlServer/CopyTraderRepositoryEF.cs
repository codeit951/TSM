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
    public class CopyTraderRepositoryEF : ICopyTraderRepository
    {
        private readonly IDbContextFactory<TSMContext> contextFactory;

        public CopyTraderRepositoryEF(IDbContextFactory<TSMContext> contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task AddCopyTraderAsync(CopyTrader copyTrader)
        {
            await using var db= contextFactory.CreateDbContext();
            await db.CopyTraders.AddAsync(copyTrader);
            await db.SaveChangesAsync();
        }

        public async Task<List<CopyTrader>> GetCopyTraderByNameAsync(string name)
        {
            await using var db = contextFactory.CreateDbContext();
            if (string.IsNullOrEmpty(name))
            {
                return await db.CopyTraders.ToListAsync();
            }
            else
            {
                return await db.CopyTraders
                    .Where(c => c.TraderName.Contains(name, StringComparison.OrdinalIgnoreCase))
                    .ToListAsync();
            }
        }

        public async Task RemoveCopyTraderAsync(int copyTraderId)
        {
            await using var db = contextFactory.CreateDbContext();
            var copyTrader = await db.CopyTraders.FindAsync(copyTraderId);
            if (copyTrader != null)
            {
                db.CopyTraders.Remove(copyTrader);
                await db.SaveChangesAsync();
            }
        }

        public async Task UpdateCopyTraderAsync(CopyTrader copyTrader)
        {
            await using var db = contextFactory.CreateDbContext();
            db.CopyTraders.Update(copyTrader);
            await db.SaveChangesAsync();
        }
    }
}
