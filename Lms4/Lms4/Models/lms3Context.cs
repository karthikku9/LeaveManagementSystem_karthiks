using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;


#nullable disable

namespace Lms4.Models
{
    public partial class lms3Context : DbContext
    {
        public lms3Context()
        {
        }

        public lms3Context(DbContextOptions<lms3Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Leave> Leaves { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
               // optionsBuilder.UseSqlServer("Server=LAPTOP-M7P53HKG\\SQLEXPRESS;Database=lms3;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("Employee");

                entity.Property(e => e.Datejoined).HasColumnType("date");

                entity.Property(e => e.Designation)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.PhoneNo)
                 .IsRequired()
                 .HasMaxLength(20)
                 .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.EmpId).HasColumnName("Emp_Id");

                entity.Property(e => e.EmployeeName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Pasword)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("pasword");

                entity.Property(e => e.Skills)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Leave>(entity =>
            {
                entity.ToTable("Leave");

                entity.Property(e => e.AppliedOn).HasColumnType("date");

                entity.Property(e => e.EmpId).HasColumnName("Emp_Id");

                entity.Property(e => e.LeaveFromDate)
                    .HasColumnType("date")
                    .HasColumnName("leaveFromDate");

                entity.Property(e => e.LeaveStatus)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('Pending')");

                entity.Property(e => e.LeaveToDate)
                    .HasColumnType("date")
                    .HasColumnName("leaveToDAte");

                entity.Property(e => e.Leavetype)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("leavetype");

                entity.Property(e => e.ManCom)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ManagerId).HasColumnName("Manager_Id");

                entity.Property(e => e.Reason)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
