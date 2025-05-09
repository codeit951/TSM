using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;
using TSM.UseCase.PluginInterfaces;

namespace TSM.InMemoryStore
{
    public class UsersRepository : IUserStore<User>, IUserPasswordStore<User>, IUserRepository
    {
        private readonly List<User> _users;

        public UsersRepository()
        {
            // Initialize with a test user (Replace with actual data source)
            _users = new List<User>
        {
            new User
            {
                FirstName = "Test",
                LastName = "User",
                Email = "Test@gmail.com",
                Password = "AQAAAAIAAYagAAAAENO/b30WB3r+Z9XXAJw8IYQNKcaiKeemI6VHHuY/iS9vFEp7xN9a1y2vUz1eKQ/OkQ==",
                Phone = "1234567890",
                Country = "United States",
                Default_Currency = "USD",
                ReferralCode = "Test123",
                ReferrerCode = "Test123",
                UserID = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                Status = StatusType.InActive,
                CreatedOn = DateTime.UtcNow,
                LastLogin = DateTime.UtcNow,
                Roles = new List<string> { "User" },
                EmailStatus = StatusType.Active,
                Plan="Starter"
            }
        };
        }

        public Task<string> AddSignalAsync(Signal signal)
        {
            throw new NotImplementedException();
        }

        public Task<string> AddSMSAsync(SMS sms)
        {
            throw new NotImplementedException();
        }

        public Task<string> AddSwapTransaction(Guid userID, Transaction transaction, string coinFrom, string coinTo, decimal amountFrom, decimal amountTo)
        {
            throw new NotImplementedException();
        }

        public Task AddTrade(Guid userID, Trade trade)
        {
            var user = _users.FirstOrDefault(u => u.UserID == userID);
            if (user != null)
            {
                if (user.Trades == null)
                {
                    user.Trades = new List<Trade>();
                }
                user.Trades.Add(trade);
            }
            return Task.CompletedTask;
        }

        public Task AddTransactionAsync(Transaction transaction)
        {
            throw new NotImplementedException();
        }

        public Task CloseTrade(Trade trade, decimal closePrice, decimal profit, decimal loss)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityResult> CreateAsync(User user, CancellationToken cancellationToken)
        {
            _users.Add(user);
            return Task.FromResult(IdentityResult.Success);
        }

        public Task<IdentityResult> DeleteAsync(User user, CancellationToken cancellationToken)
        {
            _users.Remove(user);
            return Task.FromResult(IdentityResult.Success);
        }

        public void Dispose()
        {
            
        }

        public Task<User> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            var user = _users.FirstOrDefault(u => u.UserID.ToString() == userId);
            return Task.FromResult(user);
        }

        public Task<User> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            var user = _users.FirstOrDefault(u => u.Email.ToLower() == normalizedUserName.ToLower());
            return Task.FromResult(user);
        }

        public Task<string> GetNormalizedUserNameAsync(User user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Email);
        }

        public Task<string?> GetPasswordHashAsync(User user, CancellationToken cancellationToken) => Task.FromResult(user.Password);

        public Task<string> GetUserIdAsync(User user, CancellationToken cancellationToken) => Task.FromResult(user.UserID.ToString());

        public Task<string> GetUserNameAsync(User user, CancellationToken cancellationToken) => Task.FromResult(user.Email);

        public Task<List<User>> GetUsersByName(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return Task.FromResult(_users);
            }
            else
            {
                var users = _users.Where(u => u.FirstName.Contains(name, StringComparison.OrdinalIgnoreCase) || u.LastName.Contains(name, StringComparison.OrdinalIgnoreCase)).ToList();
                return Task.FromResult(users);
            }
        }

        public Task<bool> HasPasswordAsync(User user, CancellationToken cancellationToken) => Task.FromResult(!string.IsNullOrEmpty(user.Password));

        public Task SetNormalizedUserNameAsync(User user, string normalizedName, CancellationToken cancellationToken)
        {
            user.Email = normalizedName;
            return Task.CompletedTask;
        }

        public Task SetPasswordHashAsync(User user, string passwordHash, CancellationToken cancellationToken)
        {
            user.Password = passwordHash;
            return Task.CompletedTask;
        }

        public Task SetUserNameAsync(User user, string userName, CancellationToken cancellationToken)
        {
            user.Email = userName;
            return Task.CompletedTask;
        }

        public Task<IdentityResult> UpdateAsync(User user, CancellationToken cancellationToken)
        {
            var existingUser = _users.FirstOrDefault(u => u.UserID == user.UserID);
            if (existingUser != null)
            {
                existingUser.FirstName = user.FirstName;
                existingUser.LastName = user.LastName;
                existingUser.Email = user.Email;
                existingUser.Password = user.Password;
                existingUser.Phone = user.Phone;
                existingUser.Country = user.Country;
                existingUser.Default_Currency = user.Default_Currency;
                existingUser.ReferralCode = user.ReferralCode;
                existingUser.ReferrerCode = user.ReferrerCode;
                existingUser.Status = user.Status;
                existingUser.CreatedOn = user.CreatedOn;
                existingUser.LastLogin = user.LastLogin;
                existingUser.Roles = user.Roles;
                existingUser.EmailStatus = user.EmailStatus;
                existingUser.Plan = user.Plan;
                existingUser.ProfileImage = user.ProfileImage;
                existingUser.Balances = user.Balances;
                existingUser.Trades = user.Trades;

            }
            return Task.FromResult(IdentityResult.Success);
        }

        public Task UpdateTrade(Guid userID, Trade trade)
        {
            var user = _users.FirstOrDefault(u => u.UserID == userID);
            if (user != null && user.Trades != null)
            {
                var existingTrade = user.Trades.FirstOrDefault(t => t.OrderID == trade.OrderID);
                if (existingTrade != null)
                {
                    existingTrade.ClosePrice = trade.ClosePrice;
                    existingTrade.Status = trade.Status;
                    existingTrade.IsCopied = trade.IsCopied;
                    existingTrade.CopiedTradeID = trade.CopiedTradeID;
                    existingTrade.CopiedUserID = trade.CopiedUserID;
                    existingTrade.FeePaid = trade.FeePaid;
                    existingTrade.Fee = trade.Fee;
                }
            }
            return Task.CompletedTask;
        }

        public Task UpdateUserBalance(Guid userID, List<Balance> balances)
        {
            var user = _users.FirstOrDefault(u => u.UserID == userID);
            if (user != null)
            {
                if (user.Balances == null)
                {
                    user.Balances = new List<Balance>();
                }
                foreach (var balance in balances)
                {
                    var existingBalance = user.Balances.FirstOrDefault(b => b.BalanceId == balance.BalanceId);
                    if (existingBalance != null)
                    {
                        existingBalance.Available = balance.Available;
                    }
                    else
                    {
                        user.Balances.Add(balance);
                    }
                }
            }
            return Task.CompletedTask;
        }

        public Task UseNowPayAsync(Transaction transaction)
        {
            throw new NotImplementedException();
        }

        Task<string> IUserRepository.AddTrade(Guid userID, Trade trade)
        {
            throw new NotImplementedException();
        }
    }
}
