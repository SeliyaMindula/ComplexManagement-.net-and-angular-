using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ComplexManagementAPI.Models
{
    public class LeaseAgreement
    {
        [Key]
        public int LeaseID { get; set; }
        //public virtual Store Store { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Rent { get; set; }
        public string Terms { get; set; }

        public virtual ICollection<Payment> Payments { get; set; }
    }
}
