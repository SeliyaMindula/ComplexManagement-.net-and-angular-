using Microsoft.AspNetCore.Mvc;
using ComplexManagementAPI.Models;
using Microsoft.EntityFrameworkCore;
using ComplexManagementAPI.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ComplexManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplexManagementController : ControllerBase
    {
        private readonly ComplexManagementDbContext _context;

        public ComplexManagementController(ComplexManagementDbContext context)
        {
            _context = context;
        }

        // GET: api/Stores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store>>> GetStores()
        {
            try
            {
                var stores = await _context.Stores
                    .Include(s => s.Category)
                    .Include(s => s.LeaseAgreements)
                        .ThenInclude(l => l.Payments)
                    .Include(s => s.MaintenanceContracts)
                    .ToListAsync();

                return stores;
            }
            catch (Exception ex)
            {
                // Log the exception details
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // GET: api/Stores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Store>> GetStore(int id)
        {
            try
            {
                var store = await _context.Stores
                    .Include(s => s.Category)
                    .Include(s => s.LeaseAgreements)
                        .ThenInclude(l => l.Payments)
                    .Include(s => s.MaintenanceContracts)
                    .FirstOrDefaultAsync(s => s.StoreID == id);

                if (store == null)
                {
                    return NotFound();
                }

                return store;
            }
            catch (Exception ex)
            {
                // Log the exception details
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // GET: api/Stores/Search?query=searchTerm
        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<Store>>> SearchStores(string query)
        {
            try
            {
                // Modify this query to search based on your requirements
                var stores = await _context.Stores
                    .Where(s => s.Name.Contains(query) ||
                                (s.Category != null && s.Category.Name.Contains(query)))
                    .Include(s => s.Category)
                    .Include(s => s.LeaseAgreements)
                        .ThenInclude(l => l.Payments)
                    .Include(s => s.MaintenanceContracts)
                    .ToListAsync();

                return stores;
            }
            catch (Exception ex)
            {
                // Log the exception details
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }



        // POST: api/Stores
        [HttpPost]
        public async Task<ActionResult<Store>> PostStore(Store store)
        {
            try
            {
                _context.Stores.Add(store);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetStore), new { id = store.StoreID }, store);
            }
            catch (Exception ex)
            {
                // Handle or log the exception as needed
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // PUT: api/Stores/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStore(int id, Store store)
        {
            if (id != store.StoreID)
            {
                return BadRequest();
            }

            // Update the store itself
            _context.Entry(store).State = EntityState.Modified;

            // Update category
            if (store.Category != null)
            {
                _context.Entry(store.Category).State = EntityState.Modified;
            }

            // Update each lease agreement and their payments
            foreach (var leaseAgreement in store.LeaseAgreements)
            {
                _context.Entry(leaseAgreement).State = EntityState.Modified;

                foreach (var payment in leaseAgreement.Payments)
                {
                    _context.Entry(payment).State = EntityState.Modified;
                }
            }

            // Update each maintenance contract
            foreach (var contract in store.MaintenanceContracts)
            {
                _context.Entry(contract).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // DELETE: api/Stores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStore(int id)
        {
            var store = await _context.Stores.FindAsync(id);
            if (store == null)
            {
                return NotFound();
            }

            _context.Stores.Remove(store);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool StoreExists(int id)
        {
            return _context.Stores.Any(e => e.StoreID == id);
        }
    }

}
