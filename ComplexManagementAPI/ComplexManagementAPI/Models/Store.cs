using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ComplexManagementAPI.Models
{
    public class Store
    {
        //[Key]
        public int StoreID { get; set; }
        public string Name { get; set; }
        //public int CategoryID { get; set; }
        public virtual Category Category { get; set; }
        public virtual ICollection<LeaseAgreement> LeaseAgreements { get; set; }
        public virtual ICollection<MaintenanceContract> MaintenanceContracts { get; set; }
    }
}
