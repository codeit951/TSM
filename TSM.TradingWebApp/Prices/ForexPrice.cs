using Newtonsoft.Json.Linq;
using TSM.UseCase.Assets;

namespace TSM.TradingWebApp.Prices
{
    public class ForexPrice
    {
        public Dictionary<string, decimal> Prices { get; set; } = new Dictionary<string, decimal>();
        private List<string> _symbols = new List<string>();

        private readonly HttpClient _httpClient;
        private readonly IViewAssetsByTypeUseCase viewAssetsByType;

        public ForexPrice(IViewAssetsByTypeUseCase viewAssetsByType) 
        {
            _httpClient = new HttpClient();
            this.viewAssetsByType = viewAssetsByType;
        }

        public async Task FetchPricesAsync()
        {
            var assets = await viewAssetsByType.ExecuteAsync("Fiat");
            foreach (var asset in assets)
            {
                if (!_symbols.Contains(asset.AssetSymbol))
                    _symbols.Add(asset.AssetSymbol);
            }

            var response = await _httpClient.GetAsync("https://latest.currency-api.pages.dev/v1/currencies/usd.json");

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                var data = JObject.Parse(json);

                var usdRates = data["usd"]?.ToObject<Dictionary<string, decimal>>();

                if (usdRates != null)
                {
                    foreach (var symbol in _symbols)
                    {
                        if (usdRates.TryGetValue(symbol.ToLower(), out var rate))
                        {
                            Prices[symbol.ToUpper()] = rate; // Store with uppercase key
                        }
                    }
                }
            }
        }
    }
}
