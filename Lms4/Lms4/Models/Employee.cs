using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Lms4.Models
{public partial class Employee { 
    [Key]
    [Required]
    public int Id { get; set; }
    [Required]
    public int EmpId { get; set; }
    [Required]
    [StringLength(30)]
    public string EmployeeName { get; set; }
    [Required]
    [StringLength(30)]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }
    [Required]
    [StringLength(30)]
    public string Designation { get; set; }
    // [DefaultValue(typeof(DateTime),DateTime.Now.ToString("yyyy-dd-MM"))]
    [DataType(DataType.Date)]
    public DateTime Datejoined
    { get; set; }
    [Required]
    [DataType(DataType.PhoneNumber)]
    public string PhoneNo { get; set; }
    [Required]
    public int InhandLeaves { get; set; }
    [Required]
    [StringLength(100)]
    public string Skills { get; set; }

    public int? ManagerId { get; set; }
    [Required]
    [DataType(DataType.Password)]
    public string Pasword { get; set; }
}
}
