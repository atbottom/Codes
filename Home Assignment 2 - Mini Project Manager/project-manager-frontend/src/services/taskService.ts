import axios from 'axios';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../types';

const API_BASE_URL = 'https://localhost:7000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const taskService = {
  async createTask(projectId: number, request: CreateTaskRequest): Promise<Task> {
    const response = await api.post<Task>(`/tasks/projects/${projectId}/tasks`, request);
    return response.data;
  },

  async updateTask(taskId: number, request: UpdateTaskRequest): Promise<Task> {
    const response = await api.put<Task>(`/tasks/${taskId}`, request);
    return response.data;
  },

  async deleteTask(taskId: number): Promise<void> {
    await api.delete(`/tasks/${taskId}`);
  },
};
