using HireHatchServer.Models;
using HireHatchServer.Services;
using Microsoft.AspNetCore.Mvc;

namespace HireHatchServer.Controllers
{
    [TestClass]
    public class DropdownOptionsControllerTests
    {
        private JobService? _jobService;
        private DropdownOptionsController? _controller;

        [TestInitialize]
        public void TestInitialize()
        {
            _jobService = new JobService();
            _controller = new DropdownOptionsController(_jobService);
        }

        [TestMethod]
        public void GetDropdownOptions_ReturnsDropdownOptions()
        {
            var result = _controller?.GetDropdownOptions();

            var okResult = result?.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var actualDropdownOptions = okResult.Value as DropdownOptions;
            Assert.IsNotNull(actualDropdownOptions);
        }
    }
}
