using ProjectManager.API.Models;

namespace ProjectManager.API.Services
{
    public interface IJwtService
    {
        string GenerateToken(User user);
        int? GetUserIdFromToken(string token);
    }
}
