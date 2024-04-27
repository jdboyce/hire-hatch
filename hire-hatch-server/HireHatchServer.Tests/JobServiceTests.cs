using HireHatchServer.Data;
using HireHatchServer.Models;
using HireHatchServer.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;

namespace hire_hatch_server_tests.Services
{
    [TestClass]
    public class JobServiceTests
    {
        [TestMethod]
        public void GetJobs_ReturnsJobs_WhenDatabaseAccessIsSuccessful()
        {
            var mockLogger = new Mock<ILogger<JobService>>();
            var jobs = new List<Job> { new Job(), new Job(), new Job() }.AsQueryable();
            var mockSet = new Mock<DbSet<Job>>();
            mockSet.As<IQueryable<Job>>().Setup(m => m.Provider).Returns(jobs.Provider);
            mockSet.As<IQueryable<Job>>().Setup(m => m.Expression).Returns(jobs.Expression);
            mockSet.As<IQueryable<Job>>().Setup(m => m.ElementType).Returns(jobs.ElementType);
            mockSet.As<IQueryable<Job>>().Setup(m => m.GetEnumerator()).Returns(jobs.GetEnumerator());

            var mockContext = new Mock<JobContext>();
            mockContext.Setup(c => c.Jobs).Returns(mockSet.Object);

            var service = new JobService(mockContext.Object, mockLogger.Object);

            var result = service.GetJobs();

            Assert.IsTrue(result.Success);
            Assert.IsNull(result.ErrorMessage);
            Assert.IsNotNull(result.Jobs);
            Assert.AreEqual(3, result.Jobs.Count());
        }

        [TestMethod]
        public void GetJobs_ReturnsError_WhenExceptionIsThrown()
        {
            var mockLogger = new Mock<ILogger<JobService>>();
            var mockSet = new Mock<DbSet<Job>>();
            mockSet.As<IQueryable<Job>>().Setup(m => m.GetEnumerator()).Throws(new Exception());

            var mockContext = new Mock<JobContext>();
            mockContext.Setup(c => c.Jobs).Returns(mockSet.Object);

            var service = new JobService(mockContext.Object, mockLogger.Object);

            var result = service.GetJobs();

            Assert.IsFalse(result.Success);
            Assert.AreEqual("An error occurred while retrieving the jobs.", result.ErrorMessage);
            Assert.IsNull(result.Jobs);
        }

        [TestMethod]
        public void UpdateJob_ReturnsJobNotFound_WhenJobDoesNotExist()
        {
            var mockLogger = new Mock<ILogger<JobService>>();
            var updatedJob = new Job { Id = "1", JobTitle = "Updated Job" };
            var data = new List<Job>().AsQueryable();
            var mockSet = new Mock<DbSet<Job>>();
            mockSet.As<IQueryable<Job>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<Job>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<Job>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<Job>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

            var mockContext = new Mock<JobContext>();
            mockContext.Setup(c => c.Jobs).Returns(mockSet.Object);

            var service = new JobService(mockContext.Object, mockLogger.Object);

            var result = service.UpdateJob("1", updatedJob);

            Assert.IsFalse(result.Success);
            Assert.AreEqual("Job not found.", result.ErrorMessage);
        }

        [TestMethod]
        public void UpdateJob_ReturnsSuccess_WhenUpdateIsSuccessful()
        {
            var mockLogger = new Mock<ILogger<JobService>>();
            var job = new Job { Id = "1" };
            var updatedJob = new Job { Id = "1", JobTitle = "Updated Job" };
            var data = new List<Job> { job }.AsQueryable();
            var mockSet = new Mock<DbSet<Job>>();
            mockSet.As<IQueryable<Job>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<Job>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<Job>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<Job>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

            var mockContext = new Mock<JobContext>();
            mockContext.Setup(c => c.Jobs).Returns(mockSet.Object);

            var service = new JobService(mockContext.Object, mockLogger.Object);

            var result = service.UpdateJob("1", updatedJob);

            Assert.IsTrue(result.Success);
            Assert.IsNull(result.ErrorMessage);
        }

        [TestMethod]
        public void UpdateJob_ReturnsError_WhenExceptionIsThrown()
        {
            var mockLogger = new Mock<ILogger<JobService>>();
            var updatedJob = new Job { Id = "1", JobTitle = "Updated Job" };
            var mockSet = new Mock<DbSet<Job>>();
            mockSet.As<IQueryable<Job>>().Setup(m => m.GetEnumerator()).Throws(new Exception());

            var mockContext = new Mock<JobContext>();
            mockContext.Setup(c => c.Jobs).Returns(mockSet.Object);

            var service = new JobService(mockContext.Object, mockLogger.Object);

            var result = service.UpdateJob("1", updatedJob);

            Assert.IsFalse(result.Success);
            Assert.AreEqual("An error occurred while updating the job.", result.ErrorMessage);
        }

        [TestMethod]
        public void AddJob_ReturnsSuccess_WhenJobIsAddedSuccessfully()
        {
            var mockLogger = new Mock<ILogger<JobService>>();
            var job = new Job();
            var mockSet = new Mock<DbSet<Job>>();
            mockSet.Setup(m => m.Add(It.IsAny<Job>()));

            var mockContext = new Mock<JobContext>();
            mockContext.Setup(c => c.Jobs).Returns(mockSet.Object);

            var service = new JobService(mockContext.Object, mockLogger.Object);

            var result = service.AddJob(job);

            Assert.IsTrue(result.Success);
            Assert.IsNull(result.ErrorMessage);
        }

        [TestMethod]
        public void AddJob_ReturnsError_WhenExceptionIsThrown()
        {
            var mockLogger = new Mock<ILogger<JobService>>();
            var job = new Job();
            var mockSet = new Mock<DbSet<Job>>();
            mockSet.Setup(m => m.Add(It.IsAny<Job>())).Throws(new Exception());

            var mockContext = new Mock<JobContext>();
            mockContext.Setup(c => c.Jobs).Returns(mockSet.Object);

            var service = new JobService(mockContext.Object, mockLogger.Object);

            var result = service.AddJob(job);

            Assert.IsFalse(result.Success);
            Assert.AreEqual("An error occurred while adding the job.", result.ErrorMessage);
        }

        [TestMethod]
        public void DeleteJob_ReturnsJobNotFound_WhenJobDoesNotExist()
        {
            var mockLogger = new Mock<ILogger<JobService>>();
            var data = new List<Job>().AsQueryable();
            var mockSet = new Mock<DbSet<Job>>();
            mockSet.As<IQueryable<Job>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<Job>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<Job>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<Job>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

            var mockContext = new Mock<JobContext>();
            mockContext.Setup(c => c.Jobs).Returns(mockSet.Object);

            var service = new JobService(mockContext.Object, mockLogger.Object);

            var result = service.DeleteJob("1");

            Assert.IsFalse(result.Success);
            Assert.AreEqual("Job not found.", result.ErrorMessage);
        }

        [TestMethod]
        public void DeleteJob_ReturnsSuccess_WhenJobIsDeletedSuccessfully()
        {
            var mockLogger = new Mock<ILogger<JobService>>();
            var job = new Job { Id = "1" };
            var data = new List<Job> { job }.AsQueryable();
            var mockSet = new Mock<DbSet<Job>>();
            mockSet.As<IQueryable<Job>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<Job>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<Job>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<Job>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

            var mockContext = new Mock<JobContext>();
            mockContext.Setup(c => c.Jobs).Returns(mockSet.Object);

            var service = new JobService(mockContext.Object, mockLogger.Object);

            var result = service.DeleteJob("1");

            Assert.IsTrue(result.Success);
            Assert.IsNull(result.ErrorMessage);
        }

        [TestMethod]
        public void DeleteJob_ReturnsError_WhenExceptionIsThrown()
        {
            var mockLogger = new Mock<ILogger<JobService>>();
            var mockSet = new Mock<DbSet<Job>>();
            mockSet.As<IQueryable<Job>>().Setup(m => m.GetEnumerator()).Throws(new Exception());

            var mockContext = new Mock<JobContext>();
            mockContext.Setup(c => c.Jobs).Returns(mockSet.Object);

            var service = new JobService(mockContext.Object, mockLogger.Object);

            var result = service.DeleteJob("1");

            Assert.IsFalse(result.Success);
            Assert.AreEqual("An error occurred while deleting the job.", result.ErrorMessage);
        }

        [TestMethod]
        public void GetDropdownOptions_ReturnsSuccess_WhenOptionsAreRetrievedSuccessfully()
        {
            var mockLogger = new Mock<ILogger<JobService>>();
            var jobTypes = new List<JobType> { new JobType { Name = "Full Time" } }.AsQueryable();
            var priorities = new List<Priority> { new Priority { Name = "High" } }.AsQueryable();
            var statuses = new List<Status> { new Status { Name = "Interviewed" } }.AsQueryable();
            var mockJobTypeSet = new Mock<DbSet<JobType>>();
            var mockPrioritySet = new Mock<DbSet<Priority>>();
            var mockStatusSet = new Mock<DbSet<Status>>();
            mockJobTypeSet.As<IQueryable<JobType>>().Setup(m => m.Provider).Returns(jobTypes.Provider);
            mockJobTypeSet.As<IQueryable<JobType>>().Setup(m => m.Expression).Returns(jobTypes.Expression);
            mockJobTypeSet.As<IQueryable<JobType>>().Setup(m => m.ElementType).Returns(jobTypes.ElementType);
            mockJobTypeSet.As<IQueryable<JobType>>().Setup(m => m.GetEnumerator()).Returns(jobTypes.GetEnumerator());
            mockPrioritySet.As<IQueryable<Priority>>().Setup(m => m.Provider).Returns(priorities.Provider);
            mockPrioritySet.As<IQueryable<Priority>>().Setup(m => m.Expression).Returns(priorities.Expression);
            mockPrioritySet.As<IQueryable<Priority>>().Setup(m => m.ElementType).Returns(priorities.ElementType);
            mockPrioritySet.As<IQueryable<Priority>>().Setup(m => m.GetEnumerator()).Returns(priorities.GetEnumerator());
            mockStatusSet.As<IQueryable<Status>>().Setup(m => m.Provider).Returns(statuses.Provider);
            mockStatusSet.As<IQueryable<Status>>().Setup(m => m.Expression).Returns(statuses.Expression);
            mockStatusSet.As<IQueryable<Status>>().Setup(m => m.ElementType).Returns(statuses.ElementType);
            mockStatusSet.As<IQueryable<Status>>().Setup(m => m.GetEnumerator()).Returns(statuses.GetEnumerator());

            var mockContext = new Mock<JobContext>();
            mockContext.Setup(c => c.JobTypes).Returns(mockJobTypeSet.Object);
            mockContext.Setup(c => c.Priorities).Returns(mockPrioritySet.Object);
            mockContext.Setup(c => c.Statuses).Returns(mockStatusSet.Object);

            var service = new JobService(mockContext.Object, mockLogger.Object);

            var result = service.GetDropdownOptions();

            Assert.IsTrue(result.Success);
            Assert.IsNull(result.ErrorMessage);
            Assert.IsNotNull(result.DropdownOptions);
            Assert.AreEqual(1, result.DropdownOptions.JobTypes.Count);
            Assert.AreEqual(1, result.DropdownOptions.Priorities.Count);
            Assert.AreEqual(1, result.DropdownOptions.Statuses.Count);
        }

        [TestMethod]
        public void GetDropdownOptions_ReturnsError_WhenExceptionIsThrown()
        {
            var mockLogger = new Mock<ILogger<JobService>>();
            var mockSet = new Mock<DbSet<JobType>>();
            mockSet.As<IQueryable<JobType>>().Setup(m => m.GetEnumerator()).Throws(new Exception());

            var mockContext = new Mock<JobContext>();
            mockContext.Setup(c => c.JobTypes).Returns(mockSet.Object);

            var service = new JobService(mockContext.Object, mockLogger.Object);

            var result = service.GetDropdownOptions();

            Assert.IsFalse(result.Success);
            Assert.AreEqual("An error occurred while retrieving the dropdown options.", result.ErrorMessage);
            Assert.IsNull(result.DropdownOptions);
        }
    }
}