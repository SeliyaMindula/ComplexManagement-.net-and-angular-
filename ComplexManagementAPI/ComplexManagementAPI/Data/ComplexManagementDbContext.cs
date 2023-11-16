using ComplexManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ComplexManagementAPI.Data
{
    public class ComplexManagementDbContext : DbContext
    {
        public ComplexManagementDbContext(DbContextOptions<ComplexManagementDbContext> options) : base(options) { }


        public DbSet<Category> Categories { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<LeaseAgreement> LeaseAgreements { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<MaintenanceContract> MaintenanceContracts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }
    }
}
