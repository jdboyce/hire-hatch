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
        public void Get_ReturnsServerError_WhenErrorOccurs()
        {
            var mockService = new Mock<IJobService>();
            mockService.Setup(s => s.GetJobs()).Returns((false, "An error occurred.", null));

            var controller = new JobsController(mockService.Object);

            var result = controller.Get();

            var objectResult = result.Result as ObjectResult;
            Assert.IsNotNull(objectResult);
            Assert.AreEqual(500, objectResult.StatusCode);
            Assert.AreEqual("An error occurred.", objectResult.Value);
        }

        [TestMethod]
        public void Get_ReturnsOk_WhenJobsAreRetrievedSuccessfully()
        {
            var mockService = new Mock<IJobService>();
            mockService.Setup(s => s.GetJobs()).Returns((true, null, new List<Job> { new Job() }));

            var controller = new JobsController(mockService.Object);

            var result = controller.Get();

            var okResult = result.Value as List<Job>;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(1, okResult.Count);
        }

        [TestMethod]
        public void Put_ReturnsNotFound_WhenJobDoesNotExist()
        {
            var mockService = new Mock<IJobService>();
            mockService.Setup(s => s.UpdateJob(It.IsAny<string>(), It.IsAny<Job>())).Returns((false, "Job not found."));

            var controller = new JobsController(mockService.Object);

            var result = controller.Put("1", new Job());

            var notFoundResult = result as NotFoundResult;
            Assert.IsNotNull(notFoundResult);
            Assert.AreEqual(404, notFoundResult.StatusCode);
        }

        [TestMethod]
        public void Put_ReturnsServerError_WhenErrorOccurs()
        {
            var mockService = new Mock<IJobService>();
            mockService.Setup(s => s.UpdateJob(It.IsAny<string>(), It.IsAny<Job>())).Returns((false, "An error occurred."));

            var controller = new JobsController(mockService.Object);

            var result = controller.Put("1", new Job());

            var objectResult = result as ObjectResult;
            Assert.IsNotNull(objectResult);
            Assert.AreEqual(500, objectResult.StatusCode);
            Assert.AreEqual("An error occurred.", objectResult.Value);
        }

        [TestMethod]
        public void Put_ReturnsNoContent_WhenJobIsUpdatedSuccessfully()
        {
            var mockService = new Mock<IJobService>();
            mockService.Setup(s => s.UpdateJob(It.IsAny<string>(), It.IsAny<Job>())).Returns((true, null));

            var controller = new JobsController(mockService.Object);

            var result = controller.Put("1", new Job());

            var noContentResult = result as NoContentResult;
            Assert.IsNotNull(noContentResult);
            Assert.AreEqual(204, noContentResult.StatusCode);
        }

        [TestMethod]
        public void Post_ReturnsServerError_WhenErrorOccurs()
        {
            var mockService = new Mock<IJobService>();
            var job = new Job { Id = "1" };
            mockService.Setup(s => s.AddJob(It.IsAny<Job>())).Returns((false, "An error occurred."));

            var controller = new JobsController(mockService.Object);

            var result = controller.Post(job);

            var objectResult = result as ObjectResult;
            Assert.IsNotNull(objectResult);
            Assert.AreEqual(500, objectResult.StatusCode);
            Assert.AreEqual("An error occurred.", objectResult.Value);
        }

        [TestMethod]
        public void Post_ReturnsCreatedAtAction_WhenJobIsAddedSuccessfully()
        {
            var mockService = new Mock<IJobService>();
            var job = new Job { Id = "1" };
            mockService.Setup(s => s.AddJob(It.IsAny<Job>())).Returns((true, null));

            var controller = new JobsController(mockService.Object);

            var result = controller.Post(job);

            var createdAtActionResult = result as CreatedAtActionResult;
            Assert.IsNotNull(createdAtActionResult);
            Assert.AreEqual(201, createdAtActionResult.StatusCode);
            Assert.AreEqual("Get", createdAtActionResult.ActionName);
            var jobResult = createdAtActionResult.Value as Job;
            Assert.IsNotNull(jobResult);
            Assert.AreEqual(job.Id, jobResult.Id);
        }

        [TestMethod]
        public void Delete_ReturnsNotFound_WhenJobDoesNotExist()
        {
            var mockService = new Mock<IJobService>();
            mockService.Setup(s => s.DeleteJob(It.IsAny<string>())).Returns((false, "Job not found."));

            var controller = new JobsController(mockService.Object);

            var result = controller.Delete("1");

            var notFoundResult = result as NotFoundResult;
            Assert.IsNotNull(notFoundResult);
            Assert.AreEqual(404, notFoundResult.StatusCode);
        }

        [TestMethod]
        public void Delete_ReturnsServerError_WhenErrorOccurs()
        {
            var mockService = new Mock<IJobService>();
            mockService.Setup(s => s.DeleteJob(It.IsAny<string>())).Returns((false, "An error occurred."));

            var controller = new JobsController(mockService.Object);

            var result = controller.Delete("1");

            var objectResult = result as ObjectResult;
            Assert.IsNotNull(objectResult);
            Assert.AreEqual(500, objectResult.StatusCode);
            Assert.AreEqual("An error occurred.", objectResult.Value);
        }

        [TestMethod]
        public void Delete_ReturnsNoContent_WhenJobIsDeletedSuccessfully()
        {
            var mockService = new Mock<IJobService>();
            mockService.Setup(s => s.DeleteJob(It.IsAny<string>())).Returns((true, null));

            var controller = new JobsController(mockService.Object);

            var result = controller.Delete("1");

            var noContentResult = result as NoContentResult;
            Assert.IsNotNull(noContentResult);
            Assert.AreEqual(204, noContentResult.StatusCode);
        }
    }
}