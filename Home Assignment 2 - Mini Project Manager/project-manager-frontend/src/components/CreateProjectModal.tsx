import React, { useState } from 'react';

interface CreateProjectModalProps {
  show: boolean;
  onHide: () => void;
  onCreate: (title: string, description: string) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ show, onHide, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await onCreate(title.trim(), description.trim());
      setTitle('');
      setDescription('');
      onHide();
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHide = () => {
    setTitle('');
    setDescription('');
    onHide();
  };

  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Project</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleHide}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="projectTitle" className="form-label">
                  Project Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter project title"
                  required
                  maxLength={100}
                />
                <div className="form-text">
                  {title.length}/100 characters
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="projectDescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="projectDescription"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter project description (optional)"
                  maxLength={500}
                />
                <div className="form-text">
                  {description.length}/500 characters
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleHide}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || !title.trim()}
              >
                {loading ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
