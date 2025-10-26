import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ProjectDetail as ProjectDetailType, Task } from '../types';
import { projectService } from '../services/projectService';
import { taskService } from '../services/taskService';
import AddTaskForm from '../components/AddTaskForm';
import TaskItem from '../components/TaskItem';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const [project, setProject] = useState<ProjectDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const data = await projectService.getProjectById(parseInt(id!));
      setProject(data);
    } catch (err) {
      setError('Failed to load project');
      console.error('Error loading project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (title: string, dueDate?: string) => {
    if (!project) return;

    try {
      const newTask = await taskService.createTask(project.id, { title, dueDate });
      setProject(prev => prev ? {
        ...prev,
        tasks: [...prev.tasks, newTask]
      } : null);
    } catch (err) {
      setError('Failed to add task');
      console.error('Error adding task:', err);
    }
  };

  const handleUpdateTask = async (taskId: number, updates: Partial<Task>) => {
    if (!project) return;

    try {
      const updatedTask = await taskService.updateTask(taskId, {
        title: updates.title || '',
        dueDate: updates.dueDate,
        isCompleted: updates.isCompleted || false
      });
      
      setProject(prev => prev ? {
        ...prev,
        tasks: prev.tasks.map(t => t.id === taskId ? updatedTask : t)
      } : null);
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!project) return;

    try {
      await taskService.deleteTask(taskId);
      setProject(prev => prev ? {
        ...prev,
        tasks: prev.tasks.filter(t => t.id !== taskId)
      } : null);
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Project not found
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const completedTasks = project.tasks.filter(t => t.isCompleted).length;
  const totalTasks = project.tasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => navigate('/dashboard')}
          >
            ← Back to Dashboard
          </button>
          <h1 className="d-inline">{project.title}</h1>
        </div>
        <button
          className="btn btn-outline-secondary"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Project Info */}
      <div className="card mb-4">
        <div className="card-body">
          {project.description && (
            <p className="card-text">{project.description}</p>
          )}
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Created: {new Date(project.creationDate).toLocaleDateString()}
            </small>
            <small className="text-muted">
              {completedTasks} of {totalTasks} tasks completed
            </small>
          </div>
          <div className="progress mt-2" style={{ height: '8px' }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progressPercentage}%` }}
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
          <button
            className="btn btn-sm btn-outline-danger ms-2"
            onClick={() => setError('')}
          >
            ×
          </button>
        </div>
      )}

      {/* Add Task Form */}
      <AddTaskForm onAddTask={handleAddTask} />

      {/* Tasks List */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Tasks ({totalTasks})</h5>
        </div>
        <div className="card-body p-0">
          {project.tasks.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No tasks yet. Add one above to get started!
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {project.tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
