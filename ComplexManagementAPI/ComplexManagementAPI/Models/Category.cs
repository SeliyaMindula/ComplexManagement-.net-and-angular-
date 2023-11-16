using System.ComponentModel.DataAnnotations;

namespace ComplexManagementAPI.Models
{
    public class Category
    {
       [Key]
        public int CategoryID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
