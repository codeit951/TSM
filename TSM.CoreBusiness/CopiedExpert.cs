using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSM.CoreBusiness
{
    public class CopiedExpert
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CopyID { get; set; }
        public Guid UserID { get; set; }
        public int CopyTraderID { get; set; }
        public DateTime CopyDate { get; set; } = DateTime.Now;
    }
}
