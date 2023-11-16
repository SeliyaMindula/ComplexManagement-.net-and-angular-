using System;
using System.ComponentModel.DataAnnotations;

namespace ComplexManagementAPI.Models
{
    public class MaintenanceContract
    {
        [Key]
        public int ContractID { get; set; }
        //public virtual Store Store { get; set; }

        public string ProviderName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Cost { get; set; }
        public string Details { get; set; }
    }
}
