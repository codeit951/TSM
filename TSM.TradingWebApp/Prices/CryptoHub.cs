using Microsoft.AspNetCore.SignalR;

namespace TSM.TradingWebApp.Prices
{
    public class CryptoHub : Hub
    {
        public async Task SendPrice(string symbol, decimal price)
        {
            await Clients.All.SendAsync("ReceivePrice", symbol, price);
        }
    }
}
