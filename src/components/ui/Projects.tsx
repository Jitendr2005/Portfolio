import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Sparkles, Database, Camera, ArrowRight } from 'lucide-react';
import { getProjects, Project } from '@/services/api';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
        // Fallback to hardcoded data if API fails
        setProjects([
          {
            _id: '1',
            name: "Hospital Management System",
            description: "A comprehensive software application developed using Python to efficiently manage hospital operations and data flow. Features include patient registration, doctor scheduling, appointment booking, billing, and medical records management.",
            techStack: ["Python", "Database Management", "GUI Development", "Data Flow Management"],
            github: "https://github.com/Jitendr2005/Jitendratyagi",
            url: "#"
          },
          {
            _id: '2',
            name: "Face Recognition Attendance System",
            description: "An advanced, automated solution developed using Python that leverages facial recognition technology to record attendance securely and efficiently. Eliminates manual attendance methods using webcam-based real-time face recognition.",
            techStack: ["Python", "OpenCV", "Tkinter", "Numpy", "Facial Recognition", "Computer Vision"],
            github: "https://github.com/Jitendr2005/Jitendratyagi",
            url: "#"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getProjectIcon = (projectName: string) => {
    if (projectName.toLowerCase().includes('hospital')) return Database;
    if (projectName.toLowerCase().includes('face')) return Camera;
    return Database;
  };

  const getProjectColor = (index: number) => {
    const colors = [
      "from-purple-500 to-purple-600",
      "from-blue-500 to-blue-600",
      "from-green-500 to-green-600",
      "from-red-500 to-red-600"
    ];
    return colors[index % colors.length];
  };

  const getProjectBgGradient = (index: number) => {
    const gradients = [
      "from-purple-50 to-pink-50",
      "from-blue-50 to-cyan-50",
      "from-green-50 to-emerald-50",
      "from-red-50 to-pink-50"
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 relative overflow-hidden" id="projects">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 relative overflow-hidden" id="projects">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-purple-600 mr-4" />
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
              Featured{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <Sparkles className="h-8 w-8 text-blue-600 ml-4" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Showcasing innovative solutions built with modern technologies
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {projects.map((project, index) => {
            const IconComponent = getProjectIcon(project.name);
            const color = getProjectColor(index);
            const bgGradient = getProjectBgGradient(index);
            
            return (
              <Card 
                key={project._id} 
                className={`group bg-gradient-to-br ${bgGradient} border-0 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 overflow-hidden`}
              >
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        className="opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 border-purple-300 hover:border-purple-500"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button 
                        className="opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 border-blue-300 hover:border-blue-500"
                      >
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                </CardHeader>

                <CardContent className="space-y-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-purple-600" />
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="px-4 py-2 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 text-purple-700 text-sm rounded-full font-medium hover:scale-105 transition-transform duration-200 border border-purple-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            className="group bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-10 py-5 rounded-full transition-all duration-500 transform hover:scale-110 shadow-lg border border-white/20"
          >
            <a href="https://github.com/Jitendr2005/Jitendratyagi" target="_blank" rel="noopener noreferrer">
              <Github className="mr-3 h-6 w-6 group-hover:animate-pulse" />
              View All Projects on GitHub
              <ArrowRight className="ml-3 h-6 w-8 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;