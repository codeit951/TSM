using Microsoft.AspNetCore.SignalR;

namespace TSM.TradingWebApp.Prices
{
    
    public class CryptoPriceWorker : BackgroundService
    {
        private readonly IHubContext<CryptoHub> _hubContext;
        private readonly ILogger<CryptoPriceWorker> _logger;
        private readonly Random _random = new();
        public static decimal CurrentPrice { get; set; } = 65000m; // Initial price for Bitcoin

        public CryptoPriceWorker(IHubContext<CryptoHub> hubContext, ILogger<CryptoPriceWorker> logger)
        {
            _hubContext = hubContext;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var fakePrice = 65000m + _random.Next(-1000, 1000);
                CurrentPrice = fakePrice;
                await _hubContext.Clients.All.SendAsync("ReceivePrice", "BTC", fakePrice);

                _logger.LogInformation($"[Worker] Sent BTC Price: {fakePrice}");

                await Task.Delay(5000, stoppingToken); // Update every 5 seconds
            }
        }
    }
}
