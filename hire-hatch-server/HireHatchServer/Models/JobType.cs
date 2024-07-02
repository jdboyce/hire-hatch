namespace HireHatchServer.Models
{
    public class JobType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public JobType()
        {
            Name = string.Empty;
        }
    }
}