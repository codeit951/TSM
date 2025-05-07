using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSM.CoreBusiness
{
    public class WalletAddress
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int WalletID { get; set; }
        public string Address { get; set; } = string.Empty;
        public string CoinType { get; set; } = string.Empty;
        public string Network { get; set; } = string.Empty;
        public string CoinName { get; set; } = string.Empty;
        public StatusType Status { get; set; } = StatusType.Active;
    }
}
