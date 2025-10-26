import React, { useState } from 'react';

interface AddTaskFormProps {
  onAddTask: (title: string, dueDate?: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await onAddTask(title.trim(), dueDate || undefined);
      setTitle('');
      setDueDate('');
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">Add New Task</h6>
          <div className="row g-2">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Enter task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={200}
              />
            </div>
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="col-md-1">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading || !title.trim()}
              >
                {loading ? '...' : '+'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;
