using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSM.CoreBusiness
{
    public class SMSPlan
    {
        //Stakes Mining Subscription
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PlanID { get; set; }
        public string PlanName { get; set; } = string.Empty;
        public string PlanSymbol { get; set; } = "USD";
        public SMSTypes PlanType { get; set; }
        public decimal MinimumAmount { get; set; }
        public decimal MaximumAmount { get; set; }
        public int Cycle { get; set; }
        public int ROI { get; set; }
    }
}
