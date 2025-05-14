using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.EFCoreSqlServer
{
    public class UsersRepositoryEF : IUserStore<User>, IUserPasswordStore<User>, IUserRepository
    {
        private readonly IDbContextFactory<TSMContext> contextFactory;

        public UsersRepositoryEF(IDbContextFactory<TSMContext> contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task AddConnectedWalletAsync(ConnectedWallet connectedWallet)
        {
            if (connectedWallet == null)
                throw new ArgumentNullException(nameof(connectedWallet));
            await using var db = contextFactory.CreateDbContext();
            var user = await db.Users
                .Include(u => u.ConnectedWallets)
                .FirstOrDefaultAsync(u => u.UserID == connectedWallet.UserID);
            if (user == null)
                throw new InvalidOperationException("User not found");
            user.ConnectedWallets ??= new List<ConnectedWallet>();
            user.ConnectedWallets.Add(connectedWallet);
            await db.SaveChangesAsync();
        }

        public async Task AddCopyExpertAsync(CopiedExpert copyExpert)
        {
            if (copyExpert == null)
                throw new ArgumentNullException(nameof(copyExpert));
            await using var db = contextFactory.CreateDbContext();
            var user = await db.Users
                .Include(u => u.CopiedExperts)
                .FirstOrDefaultAsync(u => u.UserID == copyExpert.UserID);
            if (user == null)
                throw new InvalidOperationException("User not found");
            user.CopiedExperts ??= new List<CopiedExpert>();
            user.CopiedExperts.Add(copyExpert);
            await db.SaveChangesAsync();
        }

        public async Task<string> AddSignalAsync(Signal signal)
        {
            if (signal == null)
                throw new ArgumentNullException(nameof(signal));

            const string STATUS_SUCCESS = "1";
            const string STATUS_INSUFFICIENT_BALANCE = "0";
            const string STATUS_USD_NOT_FOUND = "2";
            const string STATUS_USER_NOT_FOUND = "3";

            await using var db = contextFactory.CreateDbContext();

            var strategy = db.Database.CreateExecutionStrategy();

            return await strategy.ExecuteAsync(async () =>
            {
                await using var transaction = await db.Database.BeginTransactionAsync();

                try
                {
                    var user = await db.Users
                        .Include(u => u.Signals)
                        .FirstOrDefaultAsync(u => u.UserID == signal.UserID);

                    if (user == null)
                        return STATUS_USER_NOT_FOUND;

                    user.Signals ??= new List<Signal>();
                    user.Signals.Add(signal);


                    var balance = await db.Balances
                        .FirstOrDefaultAsync(b => b.UserId == signal.UserID && b.Asset.AssetSymbol == "USD");

                    if (balance == null)
                        return STATUS_USD_NOT_FOUND;

                    if (signal.Price > balance.Available)
                        return STATUS_INSUFFICIENT_BALANCE;

                    balance.Available -= signal.Price;

                    await db.SaveChangesAsync();
                    await transaction.CommitAsync();

                    return STATUS_SUCCESS;
                }
                catch
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            });
        }

        public async Task<string> AddSMSAsync(SMS sms)
        {
            if (sms == null)
                throw new ArgumentNullException(nameof(sms));

            const string STATUS_SUCCESS = "1";
            const string STATUS_INSUFFICIENT_BALANCE = "0";
            const string STATUS_ASSET_NOT_FOUND = "2";
            const string STATUS_USER_NOT_FOUND = "3";

            await using var db = contextFactory.CreateDbContext();

            var strategy = db.Database.CreateExecutionStrategy();

            return await strategy.ExecuteAsync(async () =>
            {
                await using var transaction = await db.Database.BeginTransactionAsync();

                try
                {
                    var user = await db.Users
                        .Include(u => u.SMSs)
                        .FirstOrDefaultAsync(u => u.UserID == sms.UserID);

                    if (user == null)
                        return STATUS_USER_NOT_FOUND;

                    user.SMSs ??= new List<SMS>();
                    user.SMSs.Add(sms);


                    var balance = await db.Balances
                        .FirstOrDefaultAsync(b => b.UserId == sms.UserID && b.Asset.AssetSymbol == sms.PlanSymbol);

                    if (balance == null)
                        return STATUS_ASSET_NOT_FOUND;

                    if (sms.Amount > balance.Available)
                        return STATUS_INSUFFICIENT_BALANCE;

                    balance.Available -= sms.Amount;

                    await db.SaveChangesAsync();
                    await transaction.CommitAsync();

                    return STATUS_SUCCESS;
                }
                catch
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            });
        }

        public async Task<string> AddSwapTransaction(Guid userID, Transaction transaction, string coinFrom, string coinTo, decimal amountFrom, decimal amountTo)
        {

            if (transaction == null)
                throw new ArgumentNullException(nameof(transaction));
            const string STATUS_SUCCESS = "1";
            const string STATUS_INSUFFICIENT_BALANCE = "0";
            const string STATUS_FIRST_ASSET_NOT_FOUND = "2";
            const string STATUS_SECOND_ASSET_NOT_FOUND = "3";
            const string STATUS_USER_NOT_FOUND = "4";
            const string STATUS_ERROR = "5";
            await using var db = contextFactory.CreateDbContext();
            var strategy = db.Database.CreateExecutionStrategy();
            return await strategy.ExecuteAsync(async () =>
            {
                await using var transactionDb = await db.Database.BeginTransactionAsync();
                try
                {
                    var user = await db.Users
                        .Include(u => u.Transactions)
                        .Include(u => u.Balances)
                        .FirstOrDefaultAsync(u => u.UserID == userID);
                    if (user == null)
                        return STATUS_USER_NOT_FOUND;
                    
                    var balanceFrom = await db.Balances
                        .FirstOrDefaultAsync(b => b.UserId == userID && b.Asset.AssetSymbol == coinFrom);
                    if (balanceFrom == null)
                        return STATUS_FIRST_ASSET_NOT_FOUND;
                    if (amountFrom > balanceFrom.Available)
                        return STATUS_INSUFFICIENT_BALANCE;
                    balanceFrom.Available -= amountFrom;
                    var balanceTo = await db.Balances
                        .FirstOrDefaultAsync(b => b.UserId == userID && b.Asset.AssetSymbol == coinTo);
                    if (balanceTo == null)
                        return STATUS_SECOND_ASSET_NOT_FOUND;
                    balanceTo.Available += amountTo;
                    user.Transactions ??= new List<Transaction>();
                    user.Transactions.Add(transaction);
                    await db.SaveChangesAsync();
                    await transactionDb.CommitAsync();
                    return STATUS_SUCCESS;
                }
                catch
                {
                    await transactionDb.RollbackAsync();
                    return STATUS_ERROR;
                }
            });
        }

        public async Task<string> AddTrade(Guid userID, Trade trade)
        {
            if (trade == null)
                throw new ArgumentNullException(nameof(trade));

            const string STATUS_SUCCESS = "1";
            const string STATUS_INSUFFICIENT_BALANCE = "0";
            const string STATUS_ASSET_NOT_FOUND = "2";
            const string STATUS_USER_NOT_FOUND = "3";

            await using var db = contextFactory.CreateDbContext();

            var strategy = db.Database.CreateExecutionStrategy();

            return await strategy.ExecuteAsync(async () =>
            {
                await using var transaction = await db.Database.BeginTransactionAsync();

                try
                {
                    var user = await db.Users
                        .Include(u => u.Trades)
                        .FirstOrDefaultAsync(u => u.UserID == userID);

                    if (user == null)
                        return STATUS_USER_NOT_FOUND;

                    user.Trades ??= new List<Trade>();
                    user.Trades.Add(trade);


                    var balance = await db.Balances
                        .FirstOrDefaultAsync(b => b.UserId == userID && b.Asset.AssetSymbol == trade.Symbol2);

                    if (balance == null)
                        return STATUS_ASSET_NOT_FOUND;

                    if (trade.Quantity > balance.Available)
                        return STATUS_INSUFFICIENT_BALANCE;

                    balance.Available -= trade.Quantity;
                    balance.Locked += trade.Quantity;

                    await db.SaveChangesAsync();
                    await transaction.CommitAsync();

                    return STATUS_SUCCESS;
                }
                catch
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            });
        }

        public async Task AddTransactionAsync(Transaction transaction)
        {
            if (transaction == null)
                throw new ArgumentNullException(nameof(transaction));
            await using var db = contextFactory.CreateDbContext();
            var user = await db.Users
                .Include(u => u.Transactions)
                .FirstOrDefaultAsync(u => u.UserID == transaction.UserID);
            if (user == null)
                throw new InvalidOperationException("User not found");
            user.Transactions ??= new List<Transaction>();
            user.Transactions.Add(transaction);
            await db.SaveChangesAsync();
        }

        public async Task<bool> CloseSMSAsync(SMS sms)
        {
            try
            {
                await using var db = contextFactory.CreateDbContext();
                var existingSMS = await db.SMSs
                    .FirstOrDefaultAsync(s => s.SMSID == sms.SMSID);
                if (existingSMS != null)
                {
                    existingSMS.Status = StatusType.Completed;
                    existingSMS.LastUpdate = DateTime.UtcNow;

                    var balance = await db.Balances
                        .FirstOrDefaultAsync(b => b.UserId == sms.UserID && b.Asset.AssetSymbol == sms.PlanSymbol);
                    if (balance != null)
                    {
                        balance.Available += sms.Balance;
                    }
                    await db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task CloseTrade(Trade trade, decimal closePrice, decimal profit, decimal loss)
        {
            if (trade == null)
                throw new ArgumentNullException(nameof(trade));
            await using var db = this.contextFactory.CreateDbContext();
            var existingTrade = await db.Trades
                .FirstOrDefaultAsync(t => t.OrderID == trade.OrderID && t.UserID == trade.UserID);
            if (existingTrade != null)
            {
                existingTrade.ClosePrice = closePrice;
                existingTrade.CloseTime = DateTime.UtcNow;
                existingTrade.Profit = profit;
                existingTrade.Loss = loss;
                existingTrade.Status = "Closed";
                db.Trades.Update(existingTrade);

                var balance = await db.Balances
                    .FirstOrDefaultAsync(b => b.UserId == trade.UserID && b.Asset.AssetSymbol == trade.Symbol2);
                if (balance != null)
                {
                    balance.Available += trade.Quantity;
                    balance.Locked -= trade.Quantity;

                    if (profit>0)
                    {
                        balance.Available += profit;
                    }
                    else if (loss > 0)
                    {
                        balance.Available -= loss;
                    }

                    db.Balances.Update(balance);
                }

                await db.SaveChangesAsync();
            }
        }

        public async Task<IdentityResult> CreateAsync(User user, CancellationToken cancellationToken)
        {
            await using var db = this.contextFactory.CreateDbContext();
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();
            return await Task.FromResult(IdentityResult.Success);
        }

        public async Task<IdentityResult> DeleteAsync(User user, CancellationToken cancellationToken)
        {
            await using var db = this.contextFactory.CreateDbContext();
            db.Users.Remove(user);
            await db.SaveChangesAsync();
            return await Task.FromResult(IdentityResult.Success);
        }

        public void Dispose()
        {
        }

        public async Task<User?> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            if (!Guid.TryParse(userId, out var guidUserId))
                return null;

            await using var db = contextFactory.CreateDbContext();
            return await db.Users
                .Include(u => u.Trades)
                .Include(u => u.Transactions)
                .Include(u =>u.SMSs)
                .Include(u =>u.Signals)
                .Include(u => u.Balances)
                .ThenInclude(b => b.Asset)
                .FirstOrDefaultAsync(u => u.UserID == guidUserId, cancellationToken);
        }

        public async Task<User?> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            await using var db = contextFactory.CreateDbContext();
            return await db.Users
                .Include(u => u.Trades)
                .Include(u => u.Transactions)
                .Include(u => u.SMSs)
                .Include(u => u.Signals)
                .Include(u => u.Balances)
                .ThenInclude(b => b.Asset)
                .FirstOrDefaultAsync(u => u.Email == normalizedUserName,
                    cancellationToken: cancellationToken); // Pass token to EF Core
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            await using var db = this.contextFactory.CreateDbContext();
            return await db.Users
                .Include(u => u.Trades)
                .Include(u => u.Transactions)
                .Include(u => u.SMSs)
                .Include(u => u.Signals)
                .Include(u => u.Balances)
                .ThenInclude(b => b.Asset)
                .FirstOrDefaultAsync(u => u.Email == email);
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
            await using var db = this.contextFactory.CreateDbContext();
            return await db.Users.Include(u => u.Trades).Include(u => u.Balances).ThenInclude(b => b.Asset).Where(u => u.FirstName.ToLower().IndexOf(name.ToLower()) >= 0 || u.LastName.ToLower().IndexOf(name.ToLower()) >= 0).ToListAsync();
            
        }

        public Task<bool> HasPasswordAsync(User user, CancellationToken cancellationToken) => Task.FromResult(!string.IsNullOrEmpty(user.Password));

        public async Task RemoveConnectedWalletAsync(int connectedWalletID)
        {
            await using var db = contextFactory.CreateDbContext();
            var connectedWallet = await db.ConnectedWallets.FindAsync(connectedWalletID);
            if (connectedWallet != null)
            {
                db.ConnectedWallets.Remove(connectedWallet);
                await db.SaveChangesAsync();
            }
        }

        public async Task RemoveCopyExpertAsync(int copyID)
        {
            await using var db = contextFactory.CreateDbContext();
            var copyExpert = await db.CopiedExperts.FindAsync(copyID);
            if (copyExpert != null)
            {
                db.CopiedExperts.Remove(copyExpert);
                await db.SaveChangesAsync();
            }
        }

        public async Task SetNormalizedUserNameAsync(User user, string? normalizedName, CancellationToken cancellationToken)
        {
            await using var db = contextFactory.CreateDbContext();
            db.Users.Attach(user); // Attach the detached entity
            user.Email = normalizedName;
            await db.SaveChangesAsync();
        }

        public async Task SetPasswordHashAsync(User user, string? passwordHash, CancellationToken cancellationToken)
        {
            await using var db = this.contextFactory.CreateDbContext();
            user.Password = passwordHash;
            db.Users.Update(user);
            await db.SaveChangesAsync();
        }

        public async Task SetUserNameAsync(User user, string? userName, CancellationToken cancellationToken)
        {
            await using var db = this.contextFactory.CreateDbContext();
            user.Email = userName;
            db.Users.Update(user);
            await db.SaveChangesAsync();
        }

        public async Task<IdentityResult> UpdateAsync(User user, CancellationToken cancellationToken)
        {
            await using var db = this.contextFactory.CreateDbContext();
            db.Users.Update(user);
            await db.SaveChangesAsync();
            return await Task.FromResult(IdentityResult.Success);
        }

        public async Task UpdateTrade(Guid userID, Trade trade)
        {
            await using var db = contextFactory.CreateDbContext();

            var existingTrade = await db.Trades
                .FirstOrDefaultAsync(t => t.OrderID == trade.OrderID && t.UserID == userID);

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

        public async Task UpdateUserBalance(Guid userID, List<Balance> balances)
        {
            await using var db = contextFactory.CreateDbContext();

            var user = await db.Users.Include(u => u.Balances).FirstOrDefaultAsync(u => u.UserID == userID);
            if (user != null)
            {
                foreach (var balance in balances)
                {
                    var existingBalance = await db.Balances.FirstOrDefaultAsync(b => b.AssetId==balance.AssetId && b.UserId==userID);
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

        public async Task UseNowPayAsync(Transaction transaction)
        {
            if (transaction == null)
                throw new ArgumentNullException(nameof(transaction));
            await using var db = contextFactory.CreateDbContext();
            var user = await db.Users
                .Include(u => u.Transactions)
                .FirstOrDefaultAsync(u => u.UserID == transaction.UserID);
            if (user == null)
                throw new InvalidOperationException("User not found");
            user.Transactions ??= new List<Transaction>();
            user.Transactions.Add(transaction);
            if(transaction.Status == StatusType.Approved)
            {
                var balance = await db.Balances
                    .FirstOrDefaultAsync(b => b.UserId == transaction.UserID && b.Asset.AssetSymbol == transaction.Asset);
                if (balance != null)
                {
                    balance.Available += transaction.Amount;
                    db.Balances.Update(balance);
                }
            }
            await db.SaveChangesAsync();
        }
    }
}
