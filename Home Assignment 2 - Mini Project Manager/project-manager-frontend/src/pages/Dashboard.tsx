import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';
import { projectService } from '../services/projectService';
import ProjectCard from '../components/ProjectCard';
import CreateProjectModal from '../components/CreateProjectModal';

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (title: string, description: string) => {
    try {
      const newProject = await projectService.createProject({ title, description });
      setProjects(prev => [newProject, ...prev]);
    } catch (err) {
      setError('Failed to create project');
      console.error('Error creating project:', err);
    }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      await projectService.deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError('Failed to delete project');
      console.error('Error deleting project:', err);
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

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>My Projects</h1>
          <p className="text-muted">Welcome back, {user?.firstName}!</p>
        </div>
        <div>
          <button
            className="btn btn-primary me-2"
            onClick={() => setShowCreateModal(true)}
          >
            + New Project
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={handleLogout}
          >
            Logout
          </button>
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

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">No projects yet</h5>
              <p className="card-text">Create your first project to get started!</p>
              <button
                className="btn btn-primary"
                onClick={() => setShowCreateModal(true)}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          {projects.map(project => (
            <div key={project.id} className="col-md-6 col-lg-4 mb-4">
              <ProjectCard
                project={project}
                onDelete={handleDeleteProject}
              />
            </div>
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      <CreateProjectModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
};

export default Dashboard;
