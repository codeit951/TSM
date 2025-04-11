using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSM.EFCoreSqlServer
{
    public class RoleRepositoryEF : IRoleStore<IdentityRole>
    {
        private readonly ConcurrentDictionary<string, IdentityRole> _roles = new();

        public Task<IdentityResult> CreateAsync(IdentityRole role, CancellationToken cancellationToken)
        {
            _roles[role.Name] = role;
            return Task.FromResult(IdentityResult.Success);
        }

        public Task<IdentityResult> DeleteAsync(IdentityRole role, CancellationToken cancellationToken)
        {
            _roles.TryRemove(role.Name, out _);
            return Task.FromResult(IdentityResult.Success);
        }

        public void Dispose()
        {

        }

        public Task<IdentityRole> FindByIdAsync(string roleId, CancellationToken cancellationToken)
        {
            return Task.FromResult(_roles.FirstOrDefault(r => r.Value.Id == roleId).Value);
        }

        public Task<IdentityRole> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken)
        {
            _roles.TryGetValue(normalizedRoleName, out var role);
            return Task.FromResult(role);
        }

        public Task<string> GetNormalizedRoleNameAsync(IdentityRole role, CancellationToken cancellationToken)
        => Task.FromResult(role.NormalizedName);

        public Task<string> GetRoleIdAsync(IdentityRole role, CancellationToken cancellationToken)
        => Task.FromResult(role.Id);

        public Task<string> GetRoleNameAsync(IdentityRole role, CancellationToken cancellationToken)
        => Task.FromResult(role.Name);

        public Task SetNormalizedRoleNameAsync(IdentityRole role, string normalizedName, CancellationToken cancellationToken)
        {
            role.NormalizedName = normalizedName;
            return Task.CompletedTask;
        }

        public Task SetRoleNameAsync(IdentityRole role, string roleName, CancellationToken cancellationToken)
        {
            role.Name = roleName;
            return Task.CompletedTask;
        }

        public Task<IdentityResult> UpdateAsync(IdentityRole role, CancellationToken cancellationToken)
        => Task.FromResult(IdentityResult.Success);
    }
}
