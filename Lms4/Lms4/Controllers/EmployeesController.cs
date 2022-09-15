using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Lms4.Models;
using static System.Collections.Specialized.BitVector32;
using Swashbuckle.Swagger;

namespace Lms4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly lms3Context _context;

        public EmployeesController(lms3Context context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }
        [HttpGet("man/{id}")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmpbyid(int id)
        {
            return await _context.Employees.Where(x=>x.ManagerId==id).ToListAsync();
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }
        
        [HttpGet("empid/{id}/{pas}")]
        public async Task<ActionResult<Employee>> GetEmployeebyid(int id,string pas)
        {
            try
            {
                var employee = await _context.Employees.Where(x => x.EmpId == id).SingleAsync();

                if (employee == null)
                {

                }
                else if (pas == employee.Pasword)
                {
                    return Ok("ok");
                }
                else
                {
                    return Ok("incorrect password");
                }
            }
            catch (Exception )
            {
                return Ok("incorrect id");
            }
            return NoContent();
        }
        [HttpGet("Loginid/{id}")]
        public async Task<ActionResult<Employee>> Loginbyid(int id)
        {
            try
            {
                var employee = await _context.Employees.Where(x => x.EmpId == id).SingleAsync();

                if (employee == null)
                {
                    return null;
                }
                else
                {
                    return employee;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }


        // PUT: api/Employees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
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

        // POST: api/Employees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}
