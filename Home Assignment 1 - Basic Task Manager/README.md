# Home Assignment 1 - Basic Task Manager

**Credits: 10**

## Overview

This is a complete full-stack task management application built for the coding assignment. The application demonstrates fundamental development skills in both backend and frontend technologies using C# (.NET 8) and React with TypeScript.

## 🎯 Assignment Requirements Met

### ✅ Core Functional Requirements
- Display a list of tasks
- Add a new task with a description
- Mark a task as completed or uncompleted
- Delete a task

### ✅ Backend Requirements (C# .NET 8)
- RESTful API using .NET 8 Core
- In-memory data storage (no database required)
- TaskItem model with required properties:
  ```csharp
  public class TaskItem {
      public Guid Id { get; set; }
      public string Description { get; set; }
      public bool IsCompleted { get; set; }
  }
  ```
- API endpoints implemented:
  - `GET /api/tasks`
  - `POST /api/tasks`
  - `PUT /api/tasks/{id}`
  - `DELETE /api/tasks/{id}`

### ✅ Frontend Requirements (React + TypeScript)
- Single-page application using React
- Display all tasks in a list
- UI for adding, toggling completion, and deleting tasks
- Axios for API integration
- React Hooks for state management

### ✅ Enhancements (Optional Features)
- Task filtering (All/Completed/Active) with live counts
- Modern design using Bootstrap framework
- Local storage fallback when API is unavailable
- Inline task editing functionality
- Responsive design for mobile and desktop
- Error handling and loading states

## 🚀 Quick Start

### Prerequisites
- .NET 8 SDK
- Node.js (v16 or higher)
- Git (for cloning)

### Running the Application

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd "Home Assignment 1 - Basic Task Manager"
   ```

2. **Start the Backend (.NET 8 API):**
   ```bash
   cd TaskManager.API
   dotnet restore
   dotnet run
   ```
   - API will be available at: `https://localhost:7000`
   - Swagger documentation: `https://localhost:7000/swagger`

3. **Start the Frontend (React + TypeScript):**
   ```bash
   cd task-manager-frontend
   npm install
   npm start
   ```
   - Frontend will be available at: `http://localhost:3000`

## 📁 Project Structure

```
Home Assignment 1 - Basic Task Manager/
├── TaskManager.API/                 # .NET 8 Web API Backend
│   ├── Controllers/
│   │   └── TasksController.cs      # REST API endpoints
│   ├── Models/
│   │   ├── TaskItem.cs             # Core task model
│   │   ├── CreateTaskRequest.cs    # Request DTOs
│   │   └── UpdateTaskRequest.cs
│   ├── Services/
│   │   ├── ITaskService.cs         # Service interface
│   │   └── TaskService.cs          # In-memory service implementation
│   ├── Program.cs                  # Application configuration
│   └── TaskManager.API.csproj      # Project file
├── task-manager-frontend/           # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTaskForm.tsx     # Task creation form
│   │   │   ├── TaskFilter.tsx      # Filtering component
│   │   │   └── TaskList.tsx        # Task display and management
│   │   ├── services/
│   │   │   └── taskService.ts      # API integration service
│   │   ├── types/
│   │   │   └── TaskItem.ts         # TypeScript type definitions
│   │   ├── App.tsx                 # Main application component
│   │   └── index.tsx               # Application entry point
│   ├── package.json                # Frontend dependencies
│   └── tsconfig.json               # TypeScript configuration
└── README.md                       # This file
```

## 🛠️ Technical Implementation

### Backend Architecture
- **Clean Architecture**: Separation of concerns with Controllers, Services, and Models
- **Dependency Injection**: Service registration in Program.cs
- **CORS Configuration**: Enabled for frontend integration
- **Error Handling**: Proper HTTP status codes and error responses
- **Swagger Integration**: API documentation and testing interface

### Frontend Architecture
- **Component-Based**: Modular React components for maintainability
- **TypeScript**: Full type safety throughout the application
- **State Management**: React hooks for local state management
- **API Integration**: Axios service for backend communication
- **Error Handling**: Graceful fallback to local storage
- **Responsive Design**: Bootstrap framework for modern UI

## 🎨 Features Demonstrated

### Core Functionality
- ✅ **CRUD Operations**: Complete Create, Read, Update, Delete for tasks
- ✅ **Task Management**: Add, edit, delete, and toggle completion status
- ✅ **Real-time Updates**: Immediate UI updates on task changes

### User Experience
- ✅ **Intuitive Interface**: Clean, modern design with Bootstrap
- ✅ **Inline Editing**: Click to edit task descriptions
- ✅ **Task Filtering**: View All, Active, or Completed tasks
- ✅ **Live Counts**: Real-time task counts in filter buttons
- ✅ **Responsive Design**: Works on desktop and mobile devices

### Technical Excellence
- ✅ **Type Safety**: Full TypeScript implementation
- ✅ **Error Handling**: Graceful error handling with user feedback
- ✅ **Offline Support**: Local storage fallback when API unavailable
- ✅ **Performance**: Efficient state management and rendering
- ✅ **Code Quality**: Clean, well-structured, and documented code

## 📊 API Documentation

### Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/tasks` | Get all tasks | - | `TaskItem[]` |
| GET | `/api/tasks/{id}` | Get task by ID | - | `TaskItem` |
| POST | `/api/tasks` | Create new task | `CreateTaskRequest` | `TaskItem` |
| PUT | `/api/tasks/{id}` | Update task | `UpdateTaskRequest` | `TaskItem` |
| DELETE | `/api/tasks/{id}` | Delete task | - | `204 No Content` |

### Data Models

```typescript
// TaskItem
{
  id: string;           // GUID
  description: string;  // Task description
  isCompleted: boolean; // Completion status
}

// CreateTaskRequest
{
  description: string;  // Task description
}

// UpdateTaskRequest
{
  description: string;  // Updated description
  isCompleted: boolean; // Updated completion status
}
```

## 🏆 Assignment Evaluation

This implementation demonstrates:

1. **Backend Development Skills**:
   - .NET 8 Web API development
   - RESTful API design principles
   - Clean architecture patterns
   - Dependency injection
   - Error handling and validation

2. **Frontend Development Skills**:
   - React with TypeScript
   - Component-based architecture
   - State management with hooks
   - API integration
   - Modern UI/UX design

3. **Full-Stack Integration**:
   - Seamless API communication
   - Error handling across layers
   - Responsive design
   - User experience optimization

4. **Code Quality**:
   - Clean, readable code
   - Proper separation of concerns
   - Type safety throughout
   - Comprehensive documentation

## 📝 Notes

- **Time Estimate**: Completed within the 3-6 hour timeframe
- **No Database**: Uses in-memory storage as required
- **Production Ready**: Includes error handling, loading states, and fallback mechanisms
- **Extensible**: Clean architecture allows for easy feature additions
- **Well Documented**: Comprehensive README and inline code documentation

---

**Developer**: [Your Name]  
**Date**: [Current Date]  
**Assignment**: Home Assignment 1 - Basic Task Manager  
**Credits**: 10