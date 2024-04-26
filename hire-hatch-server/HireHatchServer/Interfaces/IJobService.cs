using HireHatchServer.Models;

namespace HireHatchServer.Interfaces
{
    public interface IJobService
    {
        IEnumerable<Job> GetJobs();

        bool UpdateJob(string id, Job job);

        void AddJob(Job job);

        bool DeleteJob(string id);

        DropdownOptions GetDropdownOptions();
    }
}