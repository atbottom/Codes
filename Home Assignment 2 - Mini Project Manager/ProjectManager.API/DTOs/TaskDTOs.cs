using System.ComponentModel.DataAnnotations;

namespace ProjectManager.API.DTOs
{
    public class CreateTaskRequest
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        public DateTime? DueDate { get; set; }
    }

    public class UpdateTaskRequest
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        public DateTime? DueDate { get; set; }
        
        public bool IsCompleted { get; set; }
    }

    public class TaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime? DueDate { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public int ProjectId { get; set; }
    }
}
