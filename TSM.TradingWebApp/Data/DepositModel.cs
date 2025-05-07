using System.ComponentModel.DataAnnotations;

namespace TSM.TradingWebApp.Data
{
    public class DepositModel
    {
        [Required]
        [Range(0.00000001, 100000000, ErrorMessage = "Amount must be between 0.00000001 and 100000000")]
        public decimal Amount { get; set; }

        public string Type { get; set; } = "Crypto";

        public string OrderType { get; set; } = "Deposit";

        [Required]
        public string Method { get; set; } = "BTC";

        public string FileUpload { get; set; } = string.Empty;

    }
}
