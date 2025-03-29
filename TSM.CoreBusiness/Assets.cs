using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSM.CoreBusiness
{
    public class Assets
    {
        public int AssetId { get; set; }
        public string AssetName { get; set; } = string.Empty;
        public byte[] AssetImage { get; set; }
        public string TradingView { get; set; } = string.Empty;
        public StatusType Status { get; set; } = StatusType.Active;
    }
}
