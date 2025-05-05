using System.ComponentModel.DataAnnotations;

namespace TSM.TradingWebApp.Data
{
    public class ConvertModel
    {
        [Required]
        public string assetFrom { get; set; } = "USD";
        [Required]
        public string assetTo { get; set; } = "BTC";
        [Required]
        [Range(0.00000001, double.MaxValue, ErrorMessage = "Amount must be greater than 0.00000001")]
        public decimal amountFrom { get; set; } = 0.0m;
        [Required]
        [Range(0.00000001, double.MaxValue, ErrorMessage = "Amount must be greater than 0.00000001")]
        public decimal amountTo { get; set; } = 0.0m;
        public string OrderType { get; set; } = "Swap";
        [Required]
        public decimal Price { get; set; } = 0.0m;
    }
}
