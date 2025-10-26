import axios from 'axios';
import { Project, ProjectDetail, CreateProjectRequest, UpdateProjectRequest } from '../types';

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

export const projectService = {
  async getAllProjects(): Promise<Project[]> {
    const response = await api.get<Project[]>('/projects');
    return response.data;
  },

  async getProjectById(id: number): Promise<ProjectDetail> {
    const response = await api.get<ProjectDetail>(`/projects/${id}`);
    return response.data;
  },

  async createProject(request: CreateProjectRequest): Promise<Project> {
    const response = await api.post<Project>('/projects', request);
    return response.data;
  },

  async updateProject(id: number, request: UpdateProjectRequest): Promise<Project> {
    const response = await api.put<Project>(`/projects/${id}`, request);
    return response.data;
  },

  async deleteProject(id: number): Promise<void> {
    await api.delete(`/projects/${id}`);
  },
};
