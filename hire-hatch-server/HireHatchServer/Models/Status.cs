namespace HireHatchServer.Models
{
    public class Status
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Status()
        {
            Name = string.Empty;
        }
    }
}