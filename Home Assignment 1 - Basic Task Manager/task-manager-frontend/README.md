# Task Manager Frontend

A React + TypeScript frontend application for managing tasks.

## Features

- Modern React with TypeScript
- Task CRUD operations
- Task filtering (All/Active/Completed)
- Inline task editing
- Bootstrap styling
- Local storage fallback
- Responsive design

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Components

### AddTaskForm
Form component for adding new tasks.

### TaskList
List component displaying tasks with edit and delete functionality.

### TaskFilter
Filter component for switching between All/Active/Completed views.

## Services

### taskService
API service for communicating with the backend:
- `getAllTasks()` - Fetch all tasks
- `createTask(request)` - Create a new task
- `updateTask(id, request)` - Update a task
- `deleteTask(id)` - Delete a task

## Features

- **Task Management**: Create, read, update, and delete tasks
- **Filtering**: View all tasks, active tasks, or completed tasks
- **Inline Editing**: Click on task description to edit
- **Local Storage**: Fallback storage when API is unavailable
- **Error Handling**: Graceful error handling with user feedback
- **Responsive Design**: Works on desktop and mobile devices

## API Integration

The frontend integrates with the .NET 8 Web API:
- Base URL: `https://localhost:7000/api`
- Automatic fallback to local storage on API errors
- Real-time updates when API is available
