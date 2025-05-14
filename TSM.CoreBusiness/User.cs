using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSM.CoreBusiness
{
    public class User
    {
        public Guid UserID { get; set; } = Guid.NewGuid();
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Default_Currency { get; set; } = "USD";
        public string ReferralCode { get; set; } = string.Empty;
        public string ReferrerCode { get; set; } = string.Empty;
        public string Plan { get; set; } = string.Empty;
        public string _2FAKey { get; set; } = string.Empty;
        public int ExpertId { get; set; } = 0;
        public StatusType Status { get; set; } = StatusType.InActive;
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public DateTime LastLogin { get; set; } = DateTime.UtcNow;
        public List<string> Roles { get; set; } = new();
        public StatusType EmailStatus { get; set; } = StatusType.Pending;
        public byte[]? ProfileImage { get; set; }
        public List<Balance>? Balances { get; set; }
        public List<Trade>? Trades { get; set; }
        public List<Transaction>? Transactions { get; set; }
        public List<SMS>? SMSs { get; set; }
        public List<Signal>? Signals { get; set; }
        public List<ConnectedWallet>? ConnectedWallets { get; set; }
        public List<CopiedExpert>? CopiedExperts { get; set; }
    }
}
