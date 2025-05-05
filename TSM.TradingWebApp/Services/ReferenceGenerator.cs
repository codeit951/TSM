namespace TSM.TradingWebApp.Services
{
    public static class ReferenceGenerator
    {
        private static readonly Random random = new();

        public static string GenerateReference()
        {
            string datePart = DateTime.Now.ToString("yyyyMMdd");
            string randomPart = GetRandomString(6).ToUpper();
            return $"REF-{datePart}-{randomPart}";
        }

        private static string GetRandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }

}
