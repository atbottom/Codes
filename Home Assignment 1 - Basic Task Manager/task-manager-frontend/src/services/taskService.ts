import axios from 'axios';
import { TaskItem, CreateTaskRequest, UpdateTaskRequest } from '../types/TaskItem';

const API_BASE_URL = 'https://localhost:7000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  async getAllTasks(): Promise<TaskItem[]> {
    const response = await api.get<TaskItem[]>('/tasks');
    return response.data;
  },

  async getTaskById(id: string): Promise<TaskItem> {
    const response = await api.get<TaskItem>(`/tasks/${id}`);
    return response.data;
  },

  async createTask(request: CreateTaskRequest): Promise<TaskItem> {
    const response = await api.post<TaskItem>('/tasks', request);
    return response.data;
  },

  async updateTask(id: string, request: UpdateTaskRequest): Promise<TaskItem> {
    const response = await api.put<TaskItem>(`/tasks/${id}`, request);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
