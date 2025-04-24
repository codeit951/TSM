using Microsoft.CodeAnalysis.Elfie.Model;
using System.ComponentModel.DataAnnotations;
using TSM.CoreBusiness;

namespace TSM.TradingWebApp.Data
{
    public class TradeModel
    {
        [Required]
        public int Duration { get; set; }=2;
        [Required]
        [Range(0.00000001, 100000000, ErrorMessage = "Amount must be between 0.00000001 and 100000000")]
        public decimal Quantity { get; set; }
        public decimal StopLoss { get; set; }
        public decimal TakeProfit { get; set; }
        [Required]
        public string Symbol1 { get; set; } = "BTC";
        [Required]
        public string Symbol2 { get; set; } = "USD";
        [Required] public string Side { get; set; } = "Buy";
        [Required]
        public string OrderType { get; set; } = "Crypto";
        [Required]
        public int Leverage { get; set; } = 5;


    }
}
