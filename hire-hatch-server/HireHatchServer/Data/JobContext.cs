using HireHatchServer.Models;
using Microsoft.EntityFrameworkCore;

namespace HireHatchServer.Data
{
    public class JobContext : DbContext
    {
        public virtual DbSet<Job> Jobs { get; set; }

        public virtual DbSet<JobType> JobTypes { get; set; }

        public virtual DbSet<Priority> Priorities { get; set; }
        public virtual DbSet<Status> Statuses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string? connectionString = Environment.GetEnvironmentVariable("ConnectionString");
            if (connectionString == null)
            {
                throw new InvalidOperationException("The ConnectionString environment variable is not set.");
            }
            optionsBuilder.UseSqlite(connectionString);
        }
    }
}