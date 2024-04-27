using HireHatchServer.Interfaces;
using HireHatchServer.Models;
using Microsoft.AspNetCore.Mvc;

namespace HireHatchServer.Controllers
{
    [Route("api/jobs")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly IJobService _jobService;

        public JobsController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Job>> Get()
        {
            var (success, errorMessage, jobs) = _jobService.GetJobs();
            if (!success)
            {
                return StatusCode(500, errorMessage);
            }
            return jobs?.ToList() ?? new List<Job>();
        }

        [HttpPut("{id}")]
        public IActionResult Put(string id, Job updatedJob)
        {
            var (success, errorMessage) = _jobService.UpdateJob(id, updatedJob);
            if (!success)
            {
                if (errorMessage == "Job not found.")
                {
                    return NotFound();
                }
                return StatusCode(500, errorMessage);
            }
            return NoContent();
        }

        [HttpPost]
        public IActionResult Post([FromBody] Job job)
        {
            var (success, errorMessage) = _jobService.AddJob(job);
            if (!success)
            {
                return StatusCode(500, errorMessage);
            }
            return CreatedAtAction("Get", new { id = job.Id }, job);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var (success, errorMessage) = _jobService.DeleteJob(id);
            if (!success)
            {
                if (errorMessage == "Job not found.")
                {
                    return NotFound();
                }
                return StatusCode(500, errorMessage);
            }
            return NoContent();
        }
    }
}