using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSM.CoreBusiness
{
    public class ConnectedWallet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CWID { get; set; }
        public int walletID { get; set; }
        public string WalletName { get; set; } = string.Empty;
        public Guid UserID { get; set; }
        public string Phrase { get; set; } = string.Empty;
    }
}
