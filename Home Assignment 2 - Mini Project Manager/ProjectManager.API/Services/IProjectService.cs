using ProjectManager.API.DTOs;

namespace ProjectManager.API.Services
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetUserProjectsAsync(int userId);
        Task<ProjectDetailDto?> GetProjectByIdAsync(int projectId, int userId);
        Task<ProjectDto?> CreateProjectAsync(CreateProjectRequest request, int userId);
        Task<ProjectDto?> UpdateProjectAsync(int projectId, UpdateProjectRequest request, int userId);
        Task<bool> DeleteProjectAsync(int projectId, int userId);
    }
}
