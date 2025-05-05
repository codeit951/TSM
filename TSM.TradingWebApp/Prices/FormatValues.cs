namespace TSM.TradingWebApp.Prices
{
    public class FormatValues
    {
        public static string FormatCurrencyWithMinus(decimal amount)
        {
            if (amount < 0)
                return "-" + amount.ToString("N2").Replace("-", "").Replace("(", "").Replace(")", "");
            return "+" + amount.ToString("N2");
        }

        public static string FormatCurrencyWithMinusForBal(decimal amount)
        {
            if (amount < 0)
                return "-" + amount.ToString("N2").Replace("-", "").Replace("(", "").Replace(")", "");
            return amount.ToString("N2");
        }

        public static (decimal ProfitLossDollar, decimal ProfitLossPercent) CalculateProfitLoss(
    decimal entryPrice,
    decimal exitPrice,
    decimal margin,
    decimal leverage,
    bool isBuy)
        {
            if (entryPrice <= 0 || exitPrice <= 0 || margin <= 0 || leverage <= 0)
                return (0, 0);

            decimal positionSize = margin * leverage;
            decimal priceChangePercent = isBuy
                ? (exitPrice - entryPrice) / entryPrice       // Long
                : (entryPrice - exitPrice) / entryPrice;      // Short

            decimal profitLossDollar = positionSize * priceChangePercent;
            decimal profitLossPercent = (profitLossDollar / margin) * 100;

            return (profitLossDollar, profitLossPercent);
        }

        public static string ConvertMinutesToDetailedTime(int totalMinutes)
        {
            if (totalMinutes < 1)
                return "0 minutes";

            int minutes = totalMinutes;
            int years = minutes / (60 * 24 * 365); minutes %= (60 * 24 * 365);
            int months = minutes / (60 * 24 * 30); minutes %= (60 * 24 * 30);
            int weeks = minutes / (60 * 24 * 7); minutes %= (60 * 24 * 7);
            int days = minutes / (60 * 24); minutes %= (60 * 24);
            int hours = minutes / 60; minutes %= 60;

            var parts = new List<string>();
            if (years > 0) parts.Add($"{years} year{(years > 1 ? "s" : "")}");
            if (months > 0) parts.Add($"{months} month{(months > 1 ? "s" : "")}");
            if (weeks > 0) parts.Add($"{weeks} week{(weeks > 1 ? "s" : "")}");
            if (days > 0) parts.Add($"{days} day{(days > 1 ? "s" : "")}");
            if (hours > 0) parts.Add($"{hours} hour{(hours > 1 ? "s" : "")}");
            if (minutes > 0) parts.Add($"{minutes} minute{(minutes > 1 ? "s" : "")}");

            if (parts.Count == 1)
                return parts[0];
            else if (parts.Count == 2)
                return $"{parts[0]} and {parts[1]}";
            else
            {
                return string.Join(", ", parts.Take(parts.Count - 1)) + ", and " + parts.Last();
            }
        }


    }
}
