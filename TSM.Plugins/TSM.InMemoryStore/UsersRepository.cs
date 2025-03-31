using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSM.CoreBusiness;

namespace TSM.InMemoryStore
{
    public class UsersRepository : IUserStore<User>, IUserPasswordStore<User>
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
                UserID = Guid.NewGuid(),
                Status = StatusType.Active,
                CreatedOn = DateTime.UtcNow,
                LastLogin = DateTime.UtcNow,
                Roles = new List<string> { "User" },
                EmailStatus = StatusType.Active

            }
        };
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
            throw new NotImplementedException();
        }
    }
}
