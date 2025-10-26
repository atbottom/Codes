export interface TaskItem {
  id: string;
  description: string;
  isCompleted: boolean;
}

export interface CreateTaskRequest {
  description: string;
}

export interface UpdateTaskRequest {
  description: string;
  isCompleted: boolean;
}
