using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSM.CoreBusiness
{
    public class Signal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SignalID { get; set; }
        public Guid UserID { get; set; }
        public int PlanID { get; set; }
        public decimal Price { get; set; }
        public StatusType Status { get; set; } = StatusType.Pending;
        public int strength { get; set; }
        public DateTime BoughtDate { get; set; } = DateTime.UtcNow;
    }
}
