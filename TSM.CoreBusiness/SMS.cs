using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSM.CoreBusiness
{
    public class SMS
    {
        //Stakes Mining Subscription
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SMSID { get; set; }
        public Guid UserID { get; set; }
        public int PlanID { get; set; }
        public decimal Amount { get; set; }
        public StatusType Status { get; set; } = StatusType.Pending;
        public decimal ROI { get; set; }
        public decimal Balance { get; set; }
        public int Interval { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdate { get; set; }
        public string Type { get; set; } = "USD";
        public SMSTypes PlanType { get; set; }

    }
}
