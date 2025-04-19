using Newtonsoft.Json.Linq;
using System.Net.Http;
using TSM.UseCase.Assets;

namespace TSM.TradingWebApp.Prices
{
    public class CryptoPriceWorker : BackgroundService
    {
        private readonly CryptoPriceService _priceService;
        private readonly PricePageState pricePageState;
        private readonly IServiceProvider _serviceProvider;
        private readonly HttpClient _httpClient;
        private List<string> _symbols = new List<string>();
        public CryptoPriceWorker(IServiceProvider serviceProvider, CryptoPriceService priceService, PricePageState pricePageState)
        {
            _serviceProvider = serviceProvider;
            _priceService = priceService;
            this.pricePageState = pricePageState;
            _httpClient = new HttpClient();
        }

        public override async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();
            var viewAssetsByType = scope.ServiceProvider.GetRequiredService<IViewAssetsByTypeUseCase>();

            var assets = await viewAssetsByType.ExecuteAsync("Crypto");
            foreach (var asset in assets)
            {
                if (!_symbols.Contains(asset.AssetSymbol))
                    _symbols.Add(asset.AssetSymbol);
            }
            
            await base.StartAsync(cancellationToken);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                if (pricePageState.IsPricePageActive)
                {
                    foreach (var symbol in _symbols)
                    {
                        decimal price = await FetchPriceAsync(symbol, stoppingToken);
                        if (price > 0)
                            _priceService.SetPrice(symbol, price);

                    } 
                }
                await Task.Delay(10000, stoppingToken);
            }
        }

        
        private async Task<decimal> FetchPriceAsync(string symbol, CancellationToken stoppingToken)
        {
            decimal price = 0;
            try
            {
                var response = await _httpClient.GetAsync(
                    $"https://data-api.cryptocompare.com/index/cc/v1/latest/tick?market=cadli&instruments={symbol}-USD&apply_mapping=true&api_key=f48c0e4818b68734246c7f8c3dab2e1dc2304b0c6280d378ddad2e7e33339abf",
                    stoppingToken);

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var data = JObject.Parse(json);

                    price = data["Data"]?[symbol+"-USD"]?["VALUE"]?.Value<decimal>() ?? 0;

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching price for {symbol}: {ex.Message}");
            }

            return price;
        }

    }
}
