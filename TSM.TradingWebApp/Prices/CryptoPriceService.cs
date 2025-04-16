namespace TSM.TradingWebApp.Prices
{
    public class CryptoPriceService
    {
        public event Action<Dictionary<string, decimal>>? OnPriceUpdated;
        public Dictionary<string, decimal> Prices { get; set; } = new Dictionary<string, decimal>();

        public void SetPrice(string symbol, decimal price)
        {
            if (Prices.ContainsKey(symbol))
            {
                Prices[symbol] = price;
            }
            else
            {
                Prices.Add(symbol, price);
            }
                OnPriceUpdated?.Invoke(Prices);
        }
    }
}
