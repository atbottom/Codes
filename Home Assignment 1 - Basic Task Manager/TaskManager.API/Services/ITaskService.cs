using TaskManager.API.Models;

namespace TaskManager.API.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllTasksAsync();
        Task<TaskItem?> GetTaskByIdAsync(Guid id);
        Task<TaskItem> CreateTaskAsync(CreateTaskRequest request);
        Task<TaskItem?> UpdateTaskAsync(Guid id, UpdateTaskRequest request);
        Task<bool> DeleteTaskAsync(Guid id);
    }
}
