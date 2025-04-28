using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSM.CoreBusiness
{
    public class Transaction
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TransactionID { get; set; }

        public Guid UserID { get; set; }
        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;
        public string TransactionType { get; set; } = string.Empty;
        public string Asset { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Method { get; set; } = string.Empty;
        public StatusType Status { get; set; } = StatusType.Pending;
        public string Reference { get; set; } = string.Empty;
        public string Details { get; set; } = string.Empty;
        public bool IsForCopied { get; set; } = false;
        public Guid CopiedUserID { get; set; }
    }
}
