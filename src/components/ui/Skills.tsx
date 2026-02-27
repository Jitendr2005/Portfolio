import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Code, Database, Brain, Globe, Award, Star } from 'lucide-react';
import { getSkills, getCertificates, Skill, Certificate } from '@/services/api';

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsData, certificatesData] = await Promise.all([
          getSkills(),
          getCertificates()
        ]);
        setSkills(skillsData);
        setCertificates(certificatesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        // Fallback to hardcoded data if API fails
        setSkills([
          { _id: '1', name: 'C', level: 'Intermediate', category: 'Programming Languages' },
          { _id: '2', name: 'Python', level: 'Intermediate', category: 'Programming Languages' },
          { _id: '3', name: 'SQL', level: 'Intermediate', category: 'Programming Languages' },
          { _id: '4', name: 'HTML', level: 'Intermediate', category: 'Web Development' },
          { _id: '5', name: 'CSS', level: 'Intermediate', category: 'Web Development' },
          { _id: '6', name: 'JavaScript', level: 'Intermediate', category: 'Web Development' },
          { _id: '7', name: 'PHP', level: 'Intermediate', category: 'Web Development' },
          { _id: '8', name: 'MySQL', level: 'Intermediate', category: 'Database' },
          { _id: '9', name: 'Windows', level: 'Expert', category: 'Operating Systems' },
          { _id: '10', name: 'Artificial Intelligence', level: 'Beginner', category: 'Specialized Skills' },
        ]);
        setCertificates([
          { _id: '1', title: 'Artificial Intelligence Training', issuer: 'EDUNET FOUNDATION', date: '2023-01-01', description: '3 Days Duration' },
          { _id: '2', title: 'Python Programming', issuer: 'Data Flair', date: '2023-01-01', description: 'Certification Course' },
          { _id: '3', title: 'C Programming', issuer: 'Infosys Springboard', date: '2023-01-01', description: 'Professional Course' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group skills by category
  const skillCategories = [
    {
      icon: Code,
      title: "Programming Languages",
      skills: skills.filter(skill => skill.category === 'Programming Languages').map(skill => skill.name),
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700"
    },
    {
      icon: Globe,
      title: "Web Development",
      skills: skills.filter(skill => skill.category === 'Web Development').map(skill => skill.name),
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700"
    },
    {
      icon: Database,
      title: "Operating Systems",
      skills: skills.filter(skill => skill.category === 'Operating Systems').map(skill => skill.name),
      color: "from-indigo-500 to-indigo-600",
      hoverColor: "hover:from-indigo-600 hover:to-indigo-700"
    },
    {
      icon: Brain,
      title: "Specialized Skills",
      skills: skills.filter(skill => skill.category === 'Specialized Skills').map(skill => skill.name),
      color: "from-teal-500 to-teal-600",
      hoverColor: "hover:from-teal-600 hover:to-teal-700"
    }
  ];

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900/90 to-indigo-900 relative overflow-hidden" id="skills">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
            <p className="text-white mt-4">Loading skills...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900/90 to-indigo-900 relative overflow-hidden" id="skills">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Skills &{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="group bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} ${category.hoverColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors duration-300">
                  {category.title}
                </h3>
                
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex} 
                      className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Certifications Section */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-12">
            <Star className="h-8 w-8 text-yellow-400 mr-4" />
            <h3 className="text-3xl font-bold text-white">Certifications & Training</h3>
            <Star className="h-8 w-8 text-yellow-400 ml-4" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {certificates.map((certificate, index) => (
              <Card key={certificate._id} className="group bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-3 text-lg">{certificate.issuer}</h4>
                  <p className="text-gray-300 text-sm mb-2">{certificate.title}</p>
                  <p className="text-purple-400 text-sm font-medium">{certificate.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
