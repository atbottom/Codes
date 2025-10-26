import React, { useState } from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onUpdate: (taskId: number, updates: Partial<Task>) => void;
  onDelete: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDueDate, setEditDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  );

  const handleToggleComplete = () => {
    onUpdate(task.id, { isCompleted: !task.isCompleted });
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, {
        title: editTitle.trim(),
        dueDate: editDueDate ? new Date(editDueDate).toISOString() : undefined
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.isCompleted;

  return (
    <div className={`list-group-item ${isOverdue ? 'border-warning' : ''}`}>
      <div className="d-flex align-items-center">
        <div className="form-check me-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={task.isCompleted}
            onChange={handleToggleComplete}
          />
        </div>
        
        <div className="flex-grow-1">
          {isEditing ? (
            <div className="row g-2">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                  autoFocus
                />
              </div>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div>
              <span
                className={task.isCompleted ? 'text-decoration-line-through text-muted' : ''}
                style={{ cursor: 'pointer' }}
                onClick={() => setIsEditing(true)}
              >
                {task.title}
              </span>
              {task.dueDate && (
                <small className={`ms-2 ${isOverdue ? 'text-warning' : 'text-muted'}`}>
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                  {isOverdue && ' (Overdue)'}
                </small>
              )}
            </div>
          )}
        </div>
        
        <div className="btn-group" role="group">
          {isEditing ? (
            <>
              <button
                className="btn btn-success btn-sm"
                onClick={handleSaveEdit}
                disabled={!editTitle.trim()}
              >
                Save
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
