using System.ComponentModel.DataAnnotations;

namespace HireHatchServer.Models
{
    public class Job
    {
        public string? Id { get; set; }

        [Required]
        public string JobTitle { get; set; } = string.Empty;

        [Required]
        public string CompanyName { get; set; } = string.Empty;

        public DateTime? DateAdded { get; set; }

        public string? Priority { get; set; }
        public string? Status { get; set; }

        [Required]
        public string PostingUrl { get; set; } = string.Empty;

        public DateTime? LastUpdated { get; set; }

        public string? Source { get; set; }
        public string? Salary { get; set; }
        public string? JobType { get; set; }
        public string? Location { get; set; }
        public DateTime? DateApplied { get; set; }
        public DateTime? FollowUpDate { get; set; }
        public string? Notes { get; set; }
    }
}