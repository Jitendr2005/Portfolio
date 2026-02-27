import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProjects, getSkills, getCertificates, createProject, createSkill, createCertificate, deleteProject, deleteSkill, deleteCertificate } from '@/services/api';
import { LogOut, Plus, Trash2, FolderOpen, Zap, Award, Loader, CheckCircle, AlertCircle } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('token');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Form states
  const [projectForm, setProjectForm] = useState({ name: '', description: '', url: '', github: '', techStack: '' });
  const [skillForm, setSkillForm] = useState({ name: '', level: 'Intermediate', category: '' });
  const [certForm, setCertForm] = useState({ title: '', issuer: '', date: '', description: '', url: '' });

  // Check authentication and redirect if needed
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    setIsCheckingAuth(false);
  }, [token, navigate]);

  // Queries
  const { data: projects = [], isLoading: projectsLoading, refetch: refetchProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    enabled: !!token,
  });

  const { data: skills = [], isLoading: skillsLoading, refetch: refetchSkills } = useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
    enabled: !!token,
  });

  const { data: certificates = [], isLoading: certsLoading, refetch: refetchCerts } = useQuery({
    queryKey: ['certificates'],
    queryFn: getCertificates,
    enabled: !!token,
  });

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Add Project
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      await createProject({
        name: projectForm.name,
        description: projectForm.description,
        url: projectForm.url,
        github: projectForm.github,
        techStack: projectForm.techStack.split(',').map(t => t.trim()),
      });
      setProjectForm({ name: '', description: '', url: '', github: '', techStack: '' });
      setSuccessMessage('✅ Project added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      refetchProjects();
    } catch (err) {
      setErrorMessage('❌ Error adding project');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string) => {
    if (confirm('Delete this project?')) {
      try {
        await deleteProject(id);
        setSuccessMessage('✅ Project deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        refetchProjects();
      } catch (err) {
        setErrorMessage('❌ Error deleting project');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    }
  };

  // Add Skill
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      await createSkill({
        name: skillForm.name,
        level: skillForm.level,
        category: skillForm.category,
      });
      setSkillForm({ name: '', level: 'Intermediate', category: '' });
      setSuccessMessage('✅ Skill added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      refetchSkills();
    } catch (err) {
      setErrorMessage('❌ Error adding skill');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Delete Skill
  const handleDeleteSkill = async (id: string) => {
    if (confirm('Delete this skill?')) {
      try {
        await deleteSkill(id);
        setSuccessMessage('✅ Skill deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        refetchSkills();
      } catch (err) {
        setErrorMessage('❌ Error deleting skill');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    }
  };

  // Add Certificate
  const handleAddCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      await createCertificate({
        title: certForm.title,
        issuer: certForm.issuer,
        date: certForm.date,
        description: certForm.description,
        url: certForm.url,
      });
      setCertForm({ title: '', issuer: '', date: '', description: '', url: '' });
      setSuccessMessage('✅ Certificate added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      refetchCerts();
    } catch (err) {
      setErrorMessage('❌ Error adding certificate');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Delete Certificate
  const handleDeleteCertificate = async (id: string) => {
    if (confirm('Delete this certificate?')) {
      try {
        await deleteCertificate(id);
        setSuccessMessage('✅ Certificate deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        refetchCerts();
      } catch (err) {
        setErrorMessage('❌ Error deleting certificate');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/90 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/90 to-indigo-900 p-8">
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .slide-in {
          animation: slideIn 0.5s ease-out;
        }

        .scale-in {
          animation: scaleIn 0.3s ease-out;
        }

        .shimmer-loading {
          background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .tab-button {
          position: relative;
          transition: all 0.3s ease;
        }

        .tab-button.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #a78bfa, #818cf8);
        }

        .form-input {
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid rgba(148, 163, 184, 0.2);
          transition: all 0.3s ease;
        }

        .form-input:focus {
          background: rgba(30, 41, 59, 0.8);
          border-color: #a78bfa;
          box-shadow: 0 0 20px rgba(167, 139, 250, 0.2);
        }

        .card-item {
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          transition: all 0.3s ease;
        }

        .card-item:hover {
          border-color: rgba(167, 139, 250, 0.4);
          box-shadow: 0 8px 32px rgba(167, 139, 250, 0.15);
          transform: translateY(-2px);
        }

        .success-toast {
          background: linear-gradient(135deg, #10b981, #059669);
          animation: slideIn 0.3s ease-out;
        }

        .error-toast {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          animation: slideIn 0.3s ease-out;
        }

        .delete-btn {
          transition: all 0.2s ease;
        }

        .delete-btn:hover {
          background: rgba(239, 68, 68, 0.9);
          transform: scale(1.05);
        }

        .add-btn {
          background: linear-gradient(135deg, #a78bfa, #818cf8);
          transition: all 0.3s ease;
        }

        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(167, 139, 250, 0.3);
        }

        .add-btn:active {
          transform: translateY(0);
        }
      `}</style>

      {/* Header */}
      <div className="slide-in max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-purple-300">Manage your portfolio content</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-6 py-3 rounded-lg transition-all duration-300 border border-red-500/30"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="slide-in max-w-7xl mx-auto mb-6">
          <div className="success-toast flex items-center gap-3 px-6 py-4 rounded-lg text-white">
            <CheckCircle className="w-5 h-5" />
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="slide-in max-w-7xl mx-auto mb-6">
          <div className="error-toast flex items-center gap-3 px-6 py-4 rounded-lg text-white">
            <AlertCircle className="w-5 h-5" />
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      <div className="slide-in max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-purple-500/20">
          <button
            onClick={() => setActiveTab('projects')}
            className={`tab-button flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-300 ${
              activeTab === 'projects'
                ? 'text-purple-400'
                : 'text-gray-400 hover:text-purple-400'
            }`}
          >
            <FolderOpen className="w-5 h-5" />
            Projects
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`tab-button flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-300 ${
              activeTab === 'skills'
                ? 'text-purple-400'
                : 'text-gray-400 hover:text-purple-400'
            }`}
          >
            <Zap className="w-5 h-5" />
            Skills
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`tab-button flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-300 ${
              activeTab === 'certificates'
                ? 'text-purple-400'
                : 'text-gray-400 hover:text-purple-400'
            }`}
          >
            <Award className="w-5 h-5" />
            Certificates
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="scale-in space-y-8">
            {/* Add Project Form */}
            <div className="card-item p-6 rounded-xl border">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Plus className="w-6 h-6 text-purple-400" />
                Add New Project
              </h2>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    className="form-input px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none"
                    required
                  />
                  <input
                    type="url"
                    placeholder="Project URL"
                    value={projectForm.url}
                    onChange={(e) => setProjectForm({ ...projectForm, url: e.target.value })}
                    className="form-input px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none"
                  />
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={projectForm.github}
                    onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                    className="form-input px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Tech Stack (comma-separated)"
                    value={projectForm.techStack}
                    onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                    className="form-input px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none"
                  />
                </div>
                <textarea
                  placeholder="Project Description"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="form-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none resize-none"
                  rows={3}
                  required
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="add-btn w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add Project
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Projects List */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Your Projects</h3>
              {projectsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="shimmer-loading h-64 rounded-lg"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects?.map((project: any) => (
                    <div key={project._id} className="card-item p-6 rounded-xl border group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-2">{project.name}</h4>
                          <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack?.map((tech: string) => (
                          <span
                            key={tech}
                            className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="delete-btn w-full flex items-center justify-center gap-2 bg-red-500/20 text-red-300 hover:text-white py-2 rounded-lg border border-red-500/30"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="scale-in space-y-8">
            {/* Add Skill Form */}
            <div className="card-item p-6 rounded-xl border">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Plus className="w-6 h-6 text-purple-400" />
                Add New Skill
              </h2>
              <form onSubmit={handleAddSkill} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Skill Name"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    className="form-input px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="form-input px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none"
                    required
                  />
                </div>
                <select
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                  className="form-input w-full px-4 py-3 rounded-lg text-white outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  className="add-btn w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add Skill
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Skills List */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Your Skills</h3>
              {skillsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="shimmer-loading h-40 rounded-lg"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills?.map((skill: any) => (
                    <div key={skill._id} className="card-item p-6 rounded-xl border">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white">{skill.name}</h4>
                          <p className="text-purple-300 text-sm">{skill.category}</p>
                          <div className="mt-2 inline-block">
                            <span className="bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/30">
                              {skill.level}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteSkill(skill._id)}
                        className="delete-btn w-full flex items-center justify-center gap-2 bg-red-500/20 text-red-300 hover:text-white py-2 rounded-lg border border-red-500/30"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <div className="scale-in space-y-8">
            {/* Add Certificate Form */}
            <div className="card-item p-6 rounded-xl border">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Plus className="w-6 h-6 text-purple-400" />
                Add New Certificate
              </h2>
              <form onSubmit={handleAddCertificate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Certificate Title"
                    value={certForm.title}
                    onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                    className="form-input px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Issuer"
                    value={certForm.issuer}
                    onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                    className="form-input px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none"
                    required
                  />
                  <input
                    type="date"
                    value={certForm.date}
                    onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                    className="form-input px-4 py-3 rounded-lg text-white outline-none"
                    required
                  />
                  <input
                    type="url"
                    placeholder="Certificate URL"
                    value={certForm.url}
                    onChange={(e) => setCertForm({ ...certForm, url: e.target.value })}
                    className="form-input px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none"
                  />
                </div>
                <textarea
                  placeholder="Certificate Description"
                  value={certForm.description}
                  onChange={(e) => setCertForm({ ...certForm, description: e.target.value })}
                  className="form-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none resize-none"
                  rows={3}
                  required
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="add-btn w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add Certificate
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Certificates List */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Your Certificates</h3>
              {certsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="shimmer-loading h-48 rounded-lg"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificates?.map((cert: any) => (
                    <div key={cert._id} className="card-item p-6 rounded-xl border">
                      <div className="mb-4">
                        <h4 className="text-xl font-bold text-white mb-2">{cert.title}</h4>
                        <p className="text-purple-300 font-semibold mb-1">{cert.issuer}</p>
                        <p className="text-gray-400 text-sm mb-3">{cert.description}</p>
                        <p className="text-gray-500 text-xs">{new Date(cert.date).toLocaleDateString()}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteCertificate(cert._id)}
                        className="delete-btn w-full flex items-center justify-center gap-2 bg-red-500/20 text-red-300 hover:text-white py-2 rounded-lg border border-red-500/30"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
