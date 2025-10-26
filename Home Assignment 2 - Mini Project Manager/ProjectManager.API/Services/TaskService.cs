using Microsoft.EntityFrameworkCore;
using ProjectManager.API.Data;
using ProjectManager.API.DTOs;
using ProjectManager.API.Models;

namespace ProjectManager.API.Services
{
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _context;

        public TaskService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TaskDto?> CreateTaskAsync(int projectId, CreateTaskRequest request, int userId)
        {
            // Verify project belongs to user
            var project = await _context.Projects
                .Where(p => p.Id == projectId && p.UserId == userId)
                .FirstOrDefaultAsync();

            if (project == null)
                return null;

            var task = new Task
            {
                Title = request.Title,
                DueDate = request.DueDate,
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow,
                ProjectId = projectId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                DueDate = task.DueDate,
                IsCompleted = task.IsCompleted,
                CreatedAt = task.CreatedAt,
                ProjectId = task.ProjectId
            };
        }

        public async Task<TaskDto?> UpdateTaskAsync(int taskId, UpdateTaskRequest request, int userId)
        {
            var task = await _context.Tasks
                .Include(t => t.Project)
                .Where(t => t.Id == taskId && t.Project.UserId == userId)
                .FirstOrDefaultAsync();

            if (task == null)
                return null;

            task.Title = request.Title;
            task.DueDate = request.DueDate;
            task.IsCompleted = request.IsCompleted;

            await _context.SaveChangesAsync();

            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                DueDate = task.DueDate,
                IsCompleted = task.IsCompleted,
                CreatedAt = task.CreatedAt,
                ProjectId = task.ProjectId
            };
        }

        public async Task<bool> DeleteTaskAsync(int taskId, int userId)
        {
            var task = await _context.Tasks
                .Include(t => t.Project)
                .Where(t => t.Id == taskId && t.Project.UserId == userId)
                .FirstOrDefaultAsync();

            if (task == null)
                return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
