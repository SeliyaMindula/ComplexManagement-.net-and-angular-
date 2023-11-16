using System;
using System.ComponentModel.DataAnnotations;

namespace ComplexManagementAPI.Models
{
    public class Payment
    {
        [Key]
        public int PaymentID { get; set; }
        //public virtual LeaseAgreement LeaseAgreement { get; set; }

        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; }
        public string InvoiceNumber { get; set; }
    }
}
