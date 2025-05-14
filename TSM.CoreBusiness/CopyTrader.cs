using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSM.CoreBusiness
{
    public class CopyTrader
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CopyTraderID { get; set; }
        public Guid UserID { get; set; }
        public string TraderName { get; set; } = string.Empty;
        public byte[] TraderImage { get; set; }
        public int CopierCount { get; set; }
        public int WinRate { get; set; }
        public int ProfitShare { get; set; }
        public int Wins { get; set; }
        public int Losses { get; set; }
    }
}
