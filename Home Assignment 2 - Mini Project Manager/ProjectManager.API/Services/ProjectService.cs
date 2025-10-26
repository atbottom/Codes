using Microsoft.EntityFrameworkCore;
using ProjectManager.API.Data;
using ProjectManager.API.DTOs;
using ProjectManager.API.Models;

namespace ProjectManager.API.Services
{
    public class ProjectService : IProjectService
    {
        private readonly ApplicationDbContext _context;

        public ProjectService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProjectDto>> GetUserProjectsAsync(int userId)
        {
            var projects = await _context.Projects
                .Where(p => p.UserId == userId)
                .Include(p => p.Tasks)
                .OrderByDescending(p => p.CreationDate)
                .ToListAsync();

            return projects.Select(p => new ProjectDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                CreationDate = p.CreationDate,
                TaskCount = p.Tasks.Count,
                CompletedTaskCount = p.Tasks.Count(t => t.IsCompleted)
            });
        }

        public async Task<ProjectDetailDto?> GetProjectByIdAsync(int projectId, int userId)
        {
            var project = await _context.Projects
                .Where(p => p.Id == projectId && p.UserId == userId)
                .Include(p => p.Tasks.OrderBy(t => t.CreatedAt))
                .FirstOrDefaultAsync();

            if (project == null)
                return null;

            return new ProjectDetailDto
            {
                Id = project.Id,
                Title = project.Title,
                Description = project.Description,
                CreationDate = project.CreationDate,
                Tasks = project.Tasks.Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    DueDate = t.DueDate,
                    IsCompleted = t.IsCompleted,
                    CreatedAt = t.CreatedAt,
                    ProjectId = t.ProjectId
                }).ToList()
            };
        }

        public async Task<ProjectDto?> CreateProjectAsync(CreateProjectRequest request, int userId)
        {
            var project = new Project
            {
                Title = request.Title,
                Description = request.Description,
                CreationDate = DateTime.UtcNow,
                UserId = userId
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return new ProjectDto
            {
                Id = project.Id,
                Title = project.Title,
                Description = project.Description,
                CreationDate = project.CreationDate,
                TaskCount = 0,
                CompletedTaskCount = 0
            };
        }

        public async Task<ProjectDto?> UpdateProjectAsync(int projectId, UpdateProjectRequest request, int userId)
        {
            var project = await _context.Projects
                .Where(p => p.Id == projectId && p.UserId == userId)
                .Include(p => p.Tasks)
                .FirstOrDefaultAsync();

            if (project == null)
                return null;

            project.Title = request.Title;
            project.Description = request.Description;

            await _context.SaveChangesAsync();

            return new ProjectDto
            {
                Id = project.Id,
                Title = project.Title,
                Description = project.Description,
                CreationDate = project.CreationDate,
                TaskCount = project.Tasks.Count,
                CompletedTaskCount = project.Tasks.Count(t => t.IsCompleted)
            };
        }

        public async Task<bool> DeleteProjectAsync(int projectId, int userId)
        {
            var project = await _context.Projects
                .Where(p => p.Id == projectId && p.UserId == userId)
                .FirstOrDefaultAsync();

            if (project == null)
                return false;

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
