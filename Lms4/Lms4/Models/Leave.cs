using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Lms4.Models
{
    public partial class Leave
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public int EmpId { get; set; }
        [Required]
        public int ManagerId { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime LeaveFromDate { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime LeaveToDate { get; set; }

        public string LeaveStatus { get; set; }

        [Required]
        [StringLength(100)]
        public string Leavetype { get; set; }
        [Required]
        [StringLength(100)]
        public string Reason { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime AppliedOn { get; set; }
        [Required]
        public int NoOfDays { get; set; }
        [StringLength(100)]
        public string ManCom { get; set; }
    }
}
