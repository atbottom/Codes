# Task Manager API

A .NET 8 Web API for managing tasks with in-memory storage.

## Features

- RESTful API endpoints for task management
- In-memory data storage (no database required)
- CORS enabled for frontend integration
- Swagger documentation
- Clean architecture with dependency injection

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/{id}` | Get task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/{id}` | Update a task |
| DELETE | `/api/tasks/{id}` | Delete a task |

## Models

### TaskItem
```csharp
public class TaskItem
{
    public Guid Id { get; set; }
    public string Description { get; set; }
    public bool IsCompleted { get; set; }
}
```

### CreateTaskRequest
```csharp
public class CreateTaskRequest
{
    public string Description { get; set; }
}
```

### UpdateTaskRequest
```csharp
public class UpdateTaskRequest
{
    public string Description { get; set; }
    public bool IsCompleted { get; set; }
}
```

## Running the API

1. Navigate to the API directory:
   ```bash
   cd TaskManager.API
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the API:
   ```bash
   dotnet run
   ```

The API will be available at:
- HTTPS: `https://localhost:7000`
- HTTP: `http://localhost:5000`
- Swagger UI: `https://localhost:7000/swagger`

## Configuration

The API is configured with:
- CORS policy allowing requests from `http://localhost:3000`
- Swagger documentation in development mode
- In-memory task service as singleton
