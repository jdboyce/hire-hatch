using HireHatchServer.Models;

namespace HireHatchServer.Interfaces
{
    public interface IJobService
    {
        (bool Success, string? ErrorMessage, IEnumerable<Job>? Jobs) GetJobs();

        (bool Success, string? ErrorMessage) UpdateJob(string id, Job job);

        (bool Success, string? ErrorMessage) AddJob(Job job);

        (bool Success, string? ErrorMessage) DeleteJob(string id);

        (bool Success, string? ErrorMessage, DropdownOptions? DropdownOptions) GetDropdownOptions();
    }
}