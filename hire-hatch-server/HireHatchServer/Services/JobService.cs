using HireHatchServer.Models;
using HireHatchServer.Interfaces;

namespace HireHatchServer.Services
{
    public class JobService : IJobService
    {
        // TODO: Remove hardcoded data and implement Entity Framework to retrieve data from database instead.
        private static List<Job> _jobs = new List<Job>
        {
            new()
            {
                Id = "3107346e-69ca-4559-bf77-36ff01cfed22",
                JobTitle = "Frontend Developer",
                CompanyName = "Tech Innovations Inc.",
                Priority = "High",
                Status = "Submitted Application",
                PostingUrl = "https://www.linkedin.com/jobs/12345",
                Source = "LinkedIn",
                Salary = "$95,000",
                Type = "Full-time",
                Location = "Remote",
                DateApplied = DateTime.Parse("2024-02-16T00:00:00-05:00"),
                FollowUpDate = DateTime.Parse("2024-02-20T00:00:00-05:00"),
                Notes = "Angular-focused team. Values collaboration and continuous learning. Good work-life balance."
            },
            new()
            {
                Id = "a6e5e5a0-5c1d-4f6e-8e5f-7e7f8c6e9c7e",
                JobTitle = "Angular Developer",
                CompanyName = "Web Wizards Agency",
                Priority = "High",
                Status = "Interviewed",
                PostingUrl = "https://www.glassdoor.com/jobs/67890",
                Source = "Glassdoor",
                Salary = "$90,000",
                Type = "Full-time",
                Location = "Remote",
                DateApplied = DateTime.Parse("2024-02-10T00:00:00-05:00"),
                FollowUpDate = DateTime.Parse("2024-02-23T20:17:38-05:00"),
                Notes = "Startup culture. Encourages candid dialogue. Flexible and remote. Great reviews."
            },
            new()
            {
                Id = "d9f3d0c2-7b6e-4b1e-9c3e-8d7f6c5e4d3d",
                JobTitle = "Full Stack Developer",
                CompanyName = "Creative Minds Co.",
                Priority = "Medium",
                Status = "Prepping Interview",
                PostingUrl = "https://www.webwizards.com/careers",
                Source = "Company Website",
                Salary = "$100,000",
                Type = "Contract",
                Location = "Hybrid (Charlotte, NC)",
                DateApplied = DateTime.Parse("2024-02-06T00:00:00-05:00"),
                FollowUpDate = null,
                Notes = ".NET Core and React in stack. Good salary. Offers annual tech conference tickets."
            },
            new()
            {
                Id = "b4c2b0a4-3d6e-4c1e-9b3e-8a7f6b5c4a3b",
                JobTitle = "Software Engineer",
                CompanyName = "Digital Solutions Ltd.",
                Priority = "Medium",
                Status = "Offer Received",
                PostingUrl = "https://www.indeed.com/jobs/54321",
                Source = "Indeed",
                Salary = "$85,000",
                Type = "Full-time",
                Location = "Remote",
                DateApplied = DateTime.Parse("2024-02-06T00:00:00-05:00"),
                FollowUpDate = DateTime.Parse("2024-02-19T00:00:00-05:00"),
                Notes = "Dynamic culture with emphasis on agile development. Competitive benefits."
            },
            new()
            {
                Id = "dfd1aced-c9b2-48cf-9029-789a9fe4d4de",
                JobTitle = "Lead Developer",
                CompanyName = "InnovateTech Solutions",
                Priority = "Low",
                Status = "Reviewing Posting",
                PostingUrl = "https://www.careerbuilder.com/jobs/98765",
                Source = "CareerBuilder",
                Salary = "$40/hour",
                Type = "Part-time",
                Location = "On-site (Charlotte, NC)",
                DateApplied = null,
                FollowUpDate = null,
                Notes = "Offers mentorship programs, supports professional development."
            }
        };

        private static DropdownOptions _dropdownOptions = new DropdownOptions
        {
            Types = new List<string> { "Full-time", "Contract", "Part-time" },
            Priorities = new List<string> { "High", "Medium", "Low" },
            Statuses = new List<string> { "Reviewing Posting", "Not Interested", "Prepping Application", "Submitted Application", "Prepping Interview", "Interviewed", "Offer Received", "Declined", "Offer Accepted" }
        };

        public IEnumerable<Job> GetJobs()
        {
            return _jobs;
        }

        public bool UpdateJob(string id, Job updatedJob)
        {
            var job = _jobs.FirstOrDefault(j => j.Id == id);
            if (job == null)
            {
                return false;
            }

            job.JobTitle = updatedJob.JobTitle;
            job.CompanyName = updatedJob.CompanyName;
            job.Priority = updatedJob.Priority;
            job.Status = updatedJob.Status;
            job.PostingUrl = updatedJob.PostingUrl;
            job.Source = updatedJob.Source;
            job.Salary = updatedJob.Salary;
            job.Type = updatedJob.Type;
            job.Location = updatedJob.Location;
            job.DateApplied = updatedJob.DateApplied;
            job.FollowUpDate = updatedJob.FollowUpDate;
            job.Notes = updatedJob.Notes;

            return true;
        }

        public void AddJob(Job job)
        {
            job.Id = Guid.NewGuid().ToString();
            _jobs.Add(job);
        }

        public bool DeleteJob(string id)
        {
            var job = _jobs.FirstOrDefault(j => j.Id == id);
            if (job != null)
            {
                _jobs.Remove(job);
                return true;
            }
            return false;
        }

        public DropdownOptions GetDropdownOptions()
        {
            return _dropdownOptions;
        }
    }
}
