import React from 'react';
import { TaskItem } from '../types/TaskItem';

interface TaskListProps {
  tasks: TaskItem[];
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, description: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete, onEdit }) => {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editDescription, setEditDescription] = React.useState('');

  const handleEdit = (task: TaskItem) => {
    setEditingId(task.id);
    setEditDescription(task.description);
  };

  const handleSaveEdit = () => {
    if (editingId && editDescription.trim()) {
      onEdit(editingId, editDescription.trim());
      setEditingId(null);
      setEditDescription('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditDescription('');
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center text-muted py-4">
        <p>No tasks yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <div className="list-group">
      {tasks.map((task) => (
        <div key={task.id} className="list-group-item d-flex align-items-center">
          <div className="form-check me-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={task.isCompleted}
              onChange={(e) => onToggleComplete(task.id, e.target.checked)}
            />
          </div>
          
          <div className="flex-grow-1">
            {editingId === task.id ? (
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                  autoFocus
                />
                <button
                  className="btn btn-success btn-sm"
                  onClick={handleSaveEdit}
                  disabled={!editDescription.trim()}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <span
                className={task.isCompleted ? 'text-decoration-line-through text-muted' : ''}
                style={{ cursor: 'pointer' }}
                onClick={() => handleEdit(task)}
              >
                {task.description}
              </span>
            )}
          </div>
          
          <div className="btn-group" role="group">
            {editingId !== task.id && (
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => handleEdit(task)}
              >
                Edit
              </button>
            )}
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
