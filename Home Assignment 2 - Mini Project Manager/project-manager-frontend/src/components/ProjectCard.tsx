import React from 'react';
import { Project } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project?')) {
      onDelete(project.id);
    }
  };

  const progressPercentage = project.taskCount > 0 
    ? Math.round((project.completedTaskCount / project.taskCount) * 100)
    : 0;

  return (
    <div 
      className="card h-100 project-card"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title">{project.title}</h5>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleDelete}
          >
            ×
          </button>
        </div>
        
        {project.description && (
          <p className="card-text text-muted small mb-3">
            {project.description}
          </p>
        )}
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-muted">
              {project.completedTaskCount} of {project.taskCount} tasks completed
            </small>
            <small className="text-muted">
              {new Date(project.creationDate).toLocaleDateString()}
            </small>
          </div>
          
          <div className="progress" style={{ height: '6px' }}>
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
    </div>
  );
};

export default ProjectCard;
