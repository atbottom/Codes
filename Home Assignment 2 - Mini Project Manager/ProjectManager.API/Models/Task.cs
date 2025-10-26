using System.ComponentModel.DataAnnotations;

namespace ProjectManager.API.Models
{
    public class Task
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        public DateTime? DueDate { get; set; }
        
        public bool IsCompleted { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Foreign key
        public int ProjectId { get; set; }
        
        // Navigation properties
        public Project Project { get; set; } = null!;
    }
}
