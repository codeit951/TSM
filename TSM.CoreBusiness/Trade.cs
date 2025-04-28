using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSM.CoreBusiness
{
    public class Trade
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderID { get; set; }
        public Guid UserID { get; set; }
        public DateTime Time { get; set; } = DateTime.UtcNow;
        public DateTime CloseTime { get; set; }
        public string Duration { get; set; } = string.Empty;
        public string Symbol1 { get; set; } = string.Empty;

        public string Symbol2 { get; set; } = string.Empty;
        public string Side { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Quantity { get; set; }
        public decimal Profit { get; set; }
        public decimal Loss { get; set; }
        public decimal StopLoss { get; set; }
        public decimal TakeProfit { get; set; }
        public decimal Fee { get; set; }
        public decimal ClosePrice { get; set; }
        public string Status { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public bool IsCopied { get; set; } = false;
        public int CopiedTradeID { get; set; }
        public Guid CopiedUserID { get; set; }
        public bool FeePaid { get; set; } = false;
        public string OrderType { get; set; } = string.Empty;
        public string Leverage { get; set; } = string.Empty;

    }
}
