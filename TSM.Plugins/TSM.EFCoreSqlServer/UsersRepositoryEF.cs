using Microsoft.AspNetCore.Identity;
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
    public class UsersRepositoryEF : IUserStore<User>, IUserPasswordStore<User>, IUserRepository
    {
        private readonly TSMContext db;

        public UsersRepositoryEF(TSMContext db)
        {
            this.db = db;
        }
        public async Task AddTrade(Guid userID, Trade trade)
        {
            var user = await db.Users.Include(u => u.Trades).FirstOrDefaultAsync(u => u.UserID == userID);
            if (user != null)
            {
                if (user.Trades == null)
                {
                    user.Trades = new List<Trade>();
                }
                user.Trades.Add(trade);
                await db.SaveChangesAsync();
            }
        }

        public async Task<IdentityResult> CreateAsync(User user, CancellationToken cancellationToken)
        {
            db.Users.Add(user);
            await db.SaveChangesAsync();
            return await Task.FromResult(IdentityResult.Success);
        }

        public async Task<IdentityResult> DeleteAsync(User user, CancellationToken cancellationToken)
        {
            db.Users.Remove(user);
            await db.SaveChangesAsync();
            return await Task.FromResult(IdentityResult.Success);
        }

        public void Dispose()
        {
        }

        public async Task<User?> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            return await db.Users.Include(u => u.Trades).Include(u=>u.Balances).FirstOrDefaultAsync(u => u.UserID.ToString() == userId, cancellationToken);
            
        }

        public Task<User?> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            return db.Users
                .Include(u => u.Trades)
                .Include(u => u.Balances)
                .FirstOrDefaultAsync(u => u.Email == normalizedUserName, cancellationToken); // Include token
        }


        public Task<string?> GetNormalizedUserNameAsync(User user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Email);
        }

        public Task<string?> GetPasswordHashAsync(User user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Password);
        }

        public Task<string> GetUserIdAsync(User user, CancellationToken cancellationToken) => Task.FromResult(user.UserID.ToString());

        public Task<string?> GetUserNameAsync(User user, CancellationToken cancellationToken) => Task.FromResult(user.Email);

        public async Task<List<User>> GetUsersByName(string name)
        {
            return await db.Users.Include(u => u.Trades).Include(u => u.Balances).Where(u => u.FirstName.ToLower().IndexOf(name.ToLower()) >= 0 || u.LastName.ToLower().IndexOf(name.ToLower()) >= 0).ToListAsync();
            
        }

        public Task<bool> HasPasswordAsync(User user, CancellationToken cancellationToken) => Task.FromResult(!string.IsNullOrEmpty(user.Password));

        public async Task SetNormalizedUserNameAsync(User user, string? normalizedName, CancellationToken cancellationToken)
        {
            user.Email = normalizedName;
            db.Users.Update(user);
            await db.SaveChangesAsync();
        }

        public async Task SetPasswordHashAsync(User user, string? passwordHash, CancellationToken cancellationToken)
        {
            user.Password = passwordHash;
            db.Users.Update(user);
            await db.SaveChangesAsync();
        }

        public async Task SetUserNameAsync(User user, string? userName, CancellationToken cancellationToken)
        {
            user.Email = userName;
            db.Users.Update(user);
            await db.SaveChangesAsync();
        }

        public async Task<IdentityResult> UpdateAsync(User user, CancellationToken cancellationToken)
        {
            db.Users.Update(user);
            await db.SaveChangesAsync();
            return await Task.FromResult(IdentityResult.Success);
        }

        public async Task UpdateTrade(Guid userID, Trade trade)
        {
            var user = await db.Users.Include(u => u.Trades).FirstOrDefaultAsync(u => u.UserID == userID);
            if (user != null)
            {
                var existingTrade = db.Trades?.FirstOrDefault(t => t.OrderID == trade.OrderID);
                if (existingTrade != null)
                {
                    existingTrade.ClosePrice = trade.ClosePrice;
                    existingTrade.Status = trade.Status;
                    existingTrade.IsCopied = trade.IsCopied;
                    existingTrade.CopiedTradeID = trade.CopiedTradeID;
                    existingTrade.CopiedUserID = trade.CopiedUserID;
                    existingTrade.FeePaid = trade.FeePaid;
                    existingTrade.Fee = trade.Fee;
                    await db.SaveChangesAsync();
                }
            }
        }

        public async Task UpdateUserBalance(Guid userID, List<Balance> balances)
        {
            var user = await db.Users.Include(u => u.Balances).FirstOrDefaultAsync(u => u.UserID == userID);
            if (user != null)
            {
                foreach (var balance in balances)
                {
                    var existingBalance = await db.Balances.FindAsync(balance.BalanceId);
                    if (existingBalance != null)
                    {
                        existingBalance.Available = balance.Available;
                    }
                    else
                    {
                        db.Balances?.Add(balance);
                    }
                }
                await db.SaveChangesAsync();
            }
        }
    }
}
