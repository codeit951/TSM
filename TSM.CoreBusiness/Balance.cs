using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSM.CoreBusiness
{
    public class Balance
    {
        public int BalanceId { get; set; }
        public int AssetId { get; set; }
        public Guid UserId { get; set; }
        public decimal Available { get; set; }
        public StatusType Status { get; set; } = StatusType.Active;
    }
}
