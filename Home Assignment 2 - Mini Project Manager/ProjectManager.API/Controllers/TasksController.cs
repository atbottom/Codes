using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectManager.API.DTOs;
using ProjectManager.API.Services;
using System.Security.Claims;

namespace ProjectManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost("projects/{projectId}/tasks")]
        public async Task<ActionResult<TaskDto>> CreateTask(int projectId, CreateTaskRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetCurrentUserId();
            var task = await _taskService.CreateTaskAsync(projectId, request, userId);
            
            if (task == null)
            {
                return BadRequest("Project not found or access denied");
            }

            return CreatedAtAction(nameof(GetTask), new { taskId = task.Id }, task);
        }

        [HttpGet("{taskId}")]
        public async Task<ActionResult<TaskDto>> GetTask(int taskId)
        {
            // This would require a GetTaskById method in the service
            // For now, we'll return a simple implementation
            return Ok(new { message = "Task details endpoint - implement as needed" });
        }

        [HttpPut("{taskId}")]
        public async Task<ActionResult<TaskDto>> UpdateTask(int taskId, UpdateTaskRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetCurrentUserId();
            var task = await _taskService.UpdateTaskAsync(taskId, request, userId);
            
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpDelete("{taskId}")]
        public async Task<ActionResult> DeleteTask(int taskId)
        {
            var userId = GetCurrentUserId();
            var deleted = await _taskService.DeleteTaskAsync(taskId, userId);
            
            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            return int.Parse(userIdClaim ?? "0");
        }
    }
}
