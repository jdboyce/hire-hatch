using HireHatchServer.Interfaces;
using HireHatchServer.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace HireHatchServer.Controllers
{
    [TestClass]
    public class DropdownOptionsControllerTests
    {
        [TestMethod]
        public void GetDropdownOptions_ReturnsServerError_WhenErrorOccurs()
        {
            var mockService = new Mock<IJobService>();
            mockService.Setup(s => s.GetDropdownOptions()).Returns((false, "An error occurred.", null));

            var controller = new DropdownOptionsController(mockService.Object);

            var result = controller.GetDropdownOptions();

            var objectResult = result.Result as ObjectResult;
            Assert.IsNotNull(objectResult);
            Assert.AreEqual(500, objectResult.StatusCode);
            Assert.AreEqual("An error occurred.", objectResult.Value);
        }

        [TestMethod]
        public void GetDropdownOptions_ReturnsOk_WhenOptionsAreRetrievedSuccessfully()
        {
            var mockService = new Mock<IJobService>();
            mockService.Setup(s => s.GetDropdownOptions()).Returns((true, null, new DropdownOptions()));

            var controller = new DropdownOptionsController(mockService.Object);

            var result = controller.GetDropdownOptions();

            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.IsInstanceOfType(okResult.Value, typeof(DropdownOptions));
        }
    }
}