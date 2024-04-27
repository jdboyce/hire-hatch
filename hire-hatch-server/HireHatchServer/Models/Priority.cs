namespace HireHatchServer.Models
{
    public class Priority
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Priority()
        {
            Name = string.Empty;
        }
    }
}