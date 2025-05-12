using System.ComponentModel.DataAnnotations;

namespace TSM.TradingWebApp.Data
{
    public class SMSModel : IValidatableObject
    {
        // These are passed dynamically (e.g., in constructor or set later)
        public decimal Min { get; set; } = 0.00000001M;
        public decimal Max { get; set; } = 100000000M;

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Amount < Min || Amount > Max)
            {
                yield return new ValidationResult(
                    $"Amount must be between {Min} and {Max}",
                    new[] { nameof(Amount) });
            }
        }

        [Required]
        public decimal Amount { get; set; }

        public int Duration { get; set; } = 1;
    }
}
