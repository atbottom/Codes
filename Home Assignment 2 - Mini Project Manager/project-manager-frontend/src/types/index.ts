// Auth types
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Project types
export interface Project {
  id: number;
  title: string;
  description?: string;
  creationDate: string;
  taskCount: number;
  completedTaskCount: number;
}

export interface ProjectDetail {
  id: number;
  title: string;
  description?: string;
  creationDate: string;
  tasks: Task[];
}

export interface CreateProjectRequest {
  title: string;
  description?: string;
}

export interface UpdateProjectRequest {
  title: string;
  description?: string;
}

// Task types
export interface Task {
  id: number;
  title: string;
  dueDate?: string;
  isCompleted: boolean;
  createdAt: string;
  projectId: number;
}

export interface CreateTaskRequest {
  title: string;
  dueDate?: string;
}

export interface UpdateTaskRequest {
  title: string;
  dueDate?: string;
  isCompleted: boolean;
}
