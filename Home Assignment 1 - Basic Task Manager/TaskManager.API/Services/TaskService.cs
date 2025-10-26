using TaskManager.API.Models;

namespace TaskManager.API.Services
{
    public class TaskService : ITaskService
    {
        private readonly List<TaskItem> _tasks = new();
        private readonly object _lock = new();

        public Task<IEnumerable<TaskItem>> GetAllTasksAsync()
        {
            lock (_lock)
            {
                return Task.FromResult(_tasks.AsEnumerable());
            }
        }

        public Task<TaskItem?> GetTaskByIdAsync(Guid id)
        {
            lock (_lock)
            {
                var task = _tasks.FirstOrDefault(t => t.Id == id);
                return Task.FromResult(task);
            }
        }

        public Task<TaskItem> CreateTaskAsync(CreateTaskRequest request)
        {
            var task = new TaskItem
            {
                Id = Guid.NewGuid(),
                Description = request.Description,
                IsCompleted = false
            };

            lock (_lock)
            {
                _tasks.Add(task);
            }

            return Task.FromResult(task);
        }

        public Task<TaskItem?> UpdateTaskAsync(Guid id, UpdateTaskRequest request)
        {
            lock (_lock)
            {
                var task = _tasks.FirstOrDefault(t => t.Id == id);
                if (task != null)
                {
                    task.Description = request.Description;
                    task.IsCompleted = request.IsCompleted;
                }
                return Task.FromResult(task);
            }
        }

        public Task<bool> DeleteTaskAsync(Guid id)
        {
            lock (_lock)
            {
                var task = _tasks.FirstOrDefault(t => t.Id == id);
                if (task != null)
                {
                    _tasks.Remove(task);
                    return Task.FromResult(true);
                }
                return Task.FromResult(false);
            }
        }
    }
}
