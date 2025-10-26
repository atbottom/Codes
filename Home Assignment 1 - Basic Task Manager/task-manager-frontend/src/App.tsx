import React, { useState, useEffect } from 'react';
import { TaskItem } from './types/TaskItem';
import { taskService } from './services/taskService';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import TaskFilter, { FilterType } from './components/TaskFilter';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (err) {
        console.error('Error loading tasks from localStorage:', err);
      }
    }
    setLoading(false);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError('Failed to load tasks. Using local storage instead.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (description: string) => {
    try {
      const newTask = await taskService.createTask({ description });
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      console.error('Error creating task:', err);
      // Fallback to local creation
      const newTask: TaskItem = {
        id: Date.now().toString(),
        description,
        isCompleted: false,
      };
      setTasks(prev => [...prev, newTask]);
    }
  };

  const handleToggleComplete = async (id: string, isCompleted: boolean) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const updatedTask = await taskService.updateTask(id, {
        description: task.description,
        isCompleted,
      });
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      console.error('Error updating task:', err);
      // Fallback to local update
      setTasks(prev => prev.map(t => 
        t.id === id ? { ...t, isCompleted } : t
      ));
    }
  };

  const handleEditTask = async (id: string, description: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const updatedTask = await taskService.updateTask(id, {
        description,
        isCompleted: task.isCompleted,
      });
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      console.error('Error updating task:', err);
      // Fallback to local update
      setTasks(prev => prev.map(t => 
        t.id === id ? { ...t, description } : t
      ));
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
      // Fallback to local deletion
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.isCompleted;
      case 'completed':
        return task.isCompleted;
      default:
        return true;
    }
  });

  const taskCounts = {
    total: tasks.length,
    active: tasks.filter(t => !t.isCompleted).length,
    completed: tasks.filter(t => t.isCompleted).length,
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

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h1 className="h3 mb-0">Task Manager</h1>
              {error && (
                <div className="alert alert-warning mt-2 mb-0" role="alert">
                  {error}
                  <button 
                    className="btn btn-sm btn-outline-warning ms-2"
                    onClick={loadTasks}
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
            <div className="card-body">
              <AddTaskForm onAddTask={handleAddTask} />
              
              <TaskFilter
                currentFilter={filter}
                onFilterChange={setFilter}
                taskCounts={taskCounts}
              />
              
              <TaskList
                tasks={filteredTasks}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
