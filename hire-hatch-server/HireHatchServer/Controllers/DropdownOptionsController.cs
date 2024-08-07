﻿using HireHatchServer.Interfaces;
using HireHatchServer.Models;
using Microsoft.AspNetCore.Mvc;

namespace HireHatchServer.Controllers
{
    [Route("api/dropdown-options")]
    [ApiController]
    public class DropdownOptionsController : ControllerBase
    {
        private readonly IJobService _jobService;

        public DropdownOptionsController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet]
        public ActionResult<DropdownOptions> GetDropdownOptions()
        {
            var (success, errorMessage, options) = _jobService.GetDropdownOptions();
            if (!success)
            {
                return StatusCode(500, errorMessage);
            }
            return Ok(options);
        }
    }
}