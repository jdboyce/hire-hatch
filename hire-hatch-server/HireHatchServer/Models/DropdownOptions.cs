namespace HireHatchServer.Models
{
    public class DropdownOptions
    {
        public List<string> JobTypes { get; set; } = new List<string>();
        public List<string> Priorities { get; set; } = new List<string>();
        public List<string> Statuses { get; set; } = new List<string>();
    }
}