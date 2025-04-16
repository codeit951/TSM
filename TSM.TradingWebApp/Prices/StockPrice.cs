using Newtonsoft.Json;
using TSM.UseCase.Assets;

namespace TSM.TradingWebApp.Prices
{
    public class StockPrice
    {
        public Dictionary<string, decimal> Prices { get; set; } = new Dictionary<string, decimal>();
        private List<string> _symbols = new List<string>();
        private readonly IViewAssetsByTypeUseCase viewAssetsByType;

        private readonly HttpClient _httpClient;
        public StockPrice(IViewAssetsByTypeUseCase viewAssetsByType)
        {
            this.viewAssetsByType = viewAssetsByType;
            _httpClient = new HttpClient();
        }

        public async Task GetStockPrice()
        {
            
                var assets = await viewAssetsByType.ExecuteAsync("Stock");
                foreach (var asset in assets)
                {
                if (!_symbols.Contains(asset.AssetSymbol))
                    _symbols.Add(asset.AssetSymbol);
                }
            try
            {
                var request = new HttpRequestMessage(HttpMethod.Get, "http://codeit.com.ng/FetchStockApi.ashx");
                request.Headers.Add("ApiKey", "Bc4lvdFWMdGG77zvW1lv0yqSH6vmE8Rh");

                var response = await _httpClient.SendAsync(request);
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();

                var stockData = JsonConvert.DeserializeObject<List<StockApiModel>>(content);

                if (stockData != null)
                {
                    foreach (var item in stockData)
                    {
                        var cleanSymbol = item.Name; // e.g., "MSFT" from "MSFT:NASDAQ"
                        if (_symbols.Contains(cleanSymbol) && decimal.TryParse(item.Price.Replace("$", "").Replace(",",""), out var price))
                        {
                            Prices[cleanSymbol] = price;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching stock prices: {ex.Message}");
            }
        }
    }

    class StockApiModel
    {
        public string Name { get; set; }
        public string Symbol { get; set; }
        public string Price { get; set; }
        public string Low { get; set; }
        public string High { get; set; }
        public string Volume { get; set; }
    }
}
