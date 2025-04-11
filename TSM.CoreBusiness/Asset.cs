using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSM.CoreBusiness
{
    public class Asset
    {
        public int AssetId { get; set; }
        public string AssetName { get; set; } = string.Empty;
        public string AssetSymbol { get; set; } = string.Empty;
        public string TradingView { get; set; } = string.Empty;
        public StatusType Status { get; set; } = StatusType.Active;
        public string AssetType { get; set; } = string.Empty;
        public string SpotLeverage { get; set; } = string.Empty;
        public string MarginLeverage { get; set; } = string.Empty;
        public string FutureLeverage { get; set; } = string.Empty;
        public bool IsStar { get; set; }= false;
    }
}
