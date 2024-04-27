using HireHatchServer.Models;
using HireHatchServer.Interfaces;
using HireHatchServer.Data;

namespace HireHatchServer.Services
{
    public class JobService : IJobService
    {
        private readonly JobContext _context;
        private readonly ILogger<JobService> _logger;

        public JobService(JobContext context, ILogger<JobService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public (bool Success, string? ErrorMessage, IEnumerable<Job>? Jobs) GetJobs()
        {
            try
            {
                var jobs = _context.Jobs.ToList();
                return (true, null, jobs);
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while retrieving the jobs.";
                _logger.LogError(ex, errorMessage);
                return (false, errorMessage, null);
            }
        }

        public (bool Success, string? ErrorMessage) UpdateJob(string id, Job updatedJob)
        {
            try
            {
                var job = _context.Jobs.FirstOrDefault(j => j.Id == id);
                if (job == null)
                {
                    return (false, "Job not found.");
                }

                job.JobTitle = updatedJob.JobTitle;
                job.CompanyName = updatedJob.CompanyName;
                job.Priority = updatedJob.Priority;
                job.Status = updatedJob.Status;
                job.PostingUrl = updatedJob.PostingUrl;
                job.Source = updatedJob.Source;
                job.Salary = updatedJob.Salary;
                job.JobType = updatedJob.JobType;
                job.Location = updatedJob.Location;
                job.DateApplied = updatedJob.DateApplied;
                job.FollowUpDate = updatedJob.FollowUpDate;
                job.Notes = updatedJob.Notes;

                _context.SaveChanges();

                return (true, null);
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while updating the job.";
                _logger.LogError(ex, errorMessage);
                return (false, errorMessage);
            }
        }

        public (bool Success, string? ErrorMessage) AddJob(Job job)
        {
            try
            {
                job.Id = Guid.NewGuid().ToString();
                _context.Jobs.Add(job);
                _context.SaveChanges();
                return (true, null);
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while adding the job.";
                _logger.LogError(ex, errorMessage);
                return (false, errorMessage);
            }
        }

        public (bool Success, string? ErrorMessage) DeleteJob(string id)
        {
            try
            {
                var job = _context.Jobs.FirstOrDefault(j => j.Id == id);
                if (job == null)
                {
                    return (false, "Job not found.");
                }

                _context.Jobs.Remove(job);
                _context.SaveChanges();
                return (true, null);
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while deleting the job.";
                _logger.LogError(ex, errorMessage);
                return (false, errorMessage);
            }
        }

        public (bool Success, string? ErrorMessage, DropdownOptions? DropdownOptions) GetDropdownOptions()
        {
            try
            {
                var options = new DropdownOptions
                {
                    JobTypes = _context.JobTypes.Select(jt => jt.Name).ToList(),
                    Priorities = _context.Priorities.Select(p => p.Name).ToList(),
                    Statuses = _context.Statuses.Select(s => s.Name).ToList(),
                };
                return (true, null, options);
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while retrieving the dropdown options.";
                _logger.LogError(ex, errorMessage);
                return (false, errorMessage, null);
            }
        }
    }
}