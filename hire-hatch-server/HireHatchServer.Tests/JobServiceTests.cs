using HireHatchServer.Models;
using HireHatchServer.Services;
using System.Reflection;

namespace hire_hatch_server_tests.Services
{
    [TestClass]
    public class JobServiceTests
    {
        // TODO: Rewrite tests after implementing Entity Framework.
        [TestMethod]
        public void GetJobs_ReturnsAllJobs()
        {
            var mockJobs = new List<Job> { new Job(), new Job(), new Job() };

            var field = typeof(JobService).GetField("_jobs", BindingFlags.NonPublic | BindingFlags.Static);
            field?.SetValue(null, mockJobs);

            var service = new JobService();

            var jobs = service.GetJobs();

            Assert.AreEqual(mockJobs.Count, jobs.Count());
        }

        [TestMethod]
        public void UpdateJob_WhenJobExists_UpdatesJobAndReturnsTrue()
        {
            var existingJob = new Job { Id = "existing-job-id", JobTitle = "Existing Job" };
            var updatedJob = new Job { Id = "existing-job-id", JobTitle = "Updated Job" };
            var mockJobs = new List<Job> { existingJob };

            var field = typeof(JobService).GetField("_jobs", BindingFlags.NonPublic | BindingFlags.Static);
            field?.SetValue(null, mockJobs);

            var service = new JobService();

            var result = service.UpdateJob("existing-job-id", updatedJob);

            Assert.IsTrue(result);
            Assert.AreEqual("Updated Job", existingJob.JobTitle);
        }

        [TestMethod]
        public void UpdateJob_WhenJobDoesNotExist_ReturnsFalse()
        {
            var updatedJob = new Job { Id = "non-existing-job-id", JobTitle = "Updated Job" };
            var mockJobs = new List<Job>();

            var field = typeof(JobService).GetField("_jobs", BindingFlags.NonPublic | BindingFlags.Static);
            field?.SetValue(null, mockJobs);

            var service = new JobService();

            var result = service.UpdateJob("non-existing-job-id", updatedJob);

            Assert.IsFalse(result);
        }

        [TestMethod]
        public void AddJob_WhenCalled_AddsJobToList()
        {
            var mockJobs = new List<Job>();
            var newJob = new Job { JobTitle = "New Job" };

            var field = typeof(JobService).GetField("_jobs", BindingFlags.NonPublic | BindingFlags.Static);
            field?.SetValue(null, mockJobs);

            var service = new JobService();

            service.AddJob(newJob);

            Assert.AreEqual(1, mockJobs.Count);
            Assert.AreEqual("New Job", mockJobs[0].JobTitle);
        }

        [TestMethod]
        public void DeleteJob_WhenJobExists_RemovesJobAndReturnsTrue()
        {
            var existingJob = new Job { Id = "existing-job-id", JobTitle = "Existing Job" };
            var mockJobs = new List<Job> { existingJob };

            var field = typeof(JobService).GetField("_jobs", BindingFlags.NonPublic | BindingFlags.Static);
            field?.SetValue(null, mockJobs);

            var service = new JobService();

            var result = service.DeleteJob("existing-job-id");

            Assert.IsTrue(result);
            Assert.AreEqual(0, mockJobs.Count);
        }

        [TestMethod]
        public void DeleteJob_WhenJobDoesNotExist_ReturnsFalse()
        {
            var mockJobs = new List<Job>();

            var field = typeof(JobService).GetField("_jobs", BindingFlags.NonPublic | BindingFlags.Static);
            field?.SetValue(null, mockJobs);

            var service = new JobService();

            var result = service.DeleteJob("non-existing-job-id");

            Assert.IsFalse(result);
        }

        [TestMethod]
        public void GetDropdownOptions_ReturnsDropdownOptions()
        {
            var mockDropdownOptions = new DropdownOptions
            {
                Types = new List<string> { "Mock Type 1", "Mock Type 2" },
                Priorities = new List<string> { "Mock Priority 1", "Mock Priority 2" },
                Statuses = new List<string> { "Mock Status 1", "Mock Status 2" }
            };

            var field = typeof(JobService).GetField("_dropdownOptions", BindingFlags.NonPublic | BindingFlags.Static);
            field?.SetValue(null, mockDropdownOptions);

            var service = new JobService();

            var dropdownOptions = service.GetDropdownOptions();

            Assert.AreEqual(mockDropdownOptions, dropdownOptions);
        }
    }
}
