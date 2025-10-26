using ProjectManager.API.DTOs;

namespace ProjectManager.API.Services
{
    public interface ITaskService
    {
        Task<TaskDto?> CreateTaskAsync(int projectId, CreateTaskRequest request, int userId);
        Task<TaskDto?> UpdateTaskAsync(int taskId, UpdateTaskRequest request, int userId);
        Task<bool> DeleteTaskAsync(int taskId, int userId);
    }
}
