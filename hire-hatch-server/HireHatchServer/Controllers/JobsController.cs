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
            return _jobService.GetJobs().ToList();
        }

        [HttpPut("{id}")]
        public IActionResult Put(string id, Job updatedJob)
        {
            var updated = _jobService.UpdateJob(id, updatedJob);
            if (!updated)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPost]
        public IActionResult Post([FromBody] Job job)
        {
            _jobService.AddJob(job);
            return CreatedAtAction("Get", new { id = job.Id }, job);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var deleted = _jobService.DeleteJob(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }

    }
}
