using HireHatchServer.Controllers;
using HireHatchServer.Interfaces;
using HireHatchServer.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace hire_hatch_server_tests.Controllers
{
    [TestClass]
    public class JobsControllerTests
    {
        private Mock<IJobService>? _mockJobService;
        private JobsController? _controller;

        [TestInitialize]
        public void TestInitialize()
        {
            _mockJobService = new Mock<IJobService>();
            _controller = new JobsController(_mockJobService.Object);
        }

        [TestMethod]
        public void Get_ReturnsJobs()
        {
            var expectedJobs = new List<Job> { new Job(), new Job() };
            _mockJobService?.Setup(s => s.GetJobs()).Returns(expectedJobs);

            var result = _controller?.Get();

            Assert.IsNotNull(result?.Value);
            var actualJobs = result.Value;
            Assert.AreEqual(expectedJobs.Count, actualJobs.Count());
        }

        [TestMethod]
        public void Put_UpdatesJob_ReturnsNoContent()
        {
            var jobId = "testId";
            var updatedJob = new Job();
            _mockJobService?.Setup(s => s.UpdateJob(jobId, updatedJob)).Returns(true);

            var result = _controller?.Put(jobId, updatedJob);

            Assert.IsInstanceOfType(result, typeof(NoContentResult));
        }

        [TestMethod]
        public void Put_JobNotFound_ReturnsNotFound()
        {
            var jobId = "testId";
            var updatedJob = new Job();
            _mockJobService?.Setup(s => s.UpdateJob(jobId, updatedJob)).Returns(false);

            var result = _controller?.Put(jobId, updatedJob);

            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void Post_AddsJob()
        {
            var newJob = new Job();

            var result = _controller?.Post(newJob);

            _mockJobService?.Verify(s => s.AddJob(newJob), Times.Once);
            var createdAtActionResult = result as CreatedAtActionResult;
            Assert.IsNotNull(createdAtActionResult);
            var returnValue = createdAtActionResult.Value as Job;
            Assert.AreEqual(newJob, returnValue);
        }

        [TestMethod]
        public void Delete_JobExists_ReturnsNoContent()
        {
            var jobId = "testId";
            _mockJobService?.Setup(s => s.DeleteJob(jobId)).Returns(true);

            var result = _controller?.Delete(jobId);

            Assert.IsInstanceOfType(result, typeof(NoContentResult));
        }

        [TestMethod]
        public void Delete_JobDoesNotExist_ReturnsNotFound()
        {
            var jobId = "testId";
            _mockJobService?.Setup(s => s.DeleteJob(jobId)).Returns(false);

            var result = _controller?.Delete(jobId);

            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }
    }
}