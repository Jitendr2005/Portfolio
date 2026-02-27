import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

import { GraduationCap, MapPin, Target, Award, Code, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-purple-50/50 to-blue-50/50 relative overflow-hidden" id="about">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Passionate about creating innovative solutions through technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="prose prose-lg text-gray-700">
              <p className="text-xl leading-relaxed mb-8 text-gray-800">
                I'm a dedicated Computer Science student at IILM University, Greater Noida, with a passion for 
                developing innovative software solutions. My journey in technology spans across multiple domains 
                including artificial intelligence, web development, and database management.
              </p>
              
              <p className="text-lg leading-relaxed mb-8 text-gray-700">
                I believe in working pragmatically to show my talent and enhance my skills while contributing 
                meaningfully to organizational success. My goal is to be part of reputed organizations that 
                provide steady career growth along with job satisfaction and challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Education</h3>
                      <p className="text-sm text-gray-600">B.Tech Computer Science</p>
                      <p className="text-sm text-purple-600 font-medium">IILM University</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Location</h3>
                      <p className="text-sm text-gray-600">Noida, Uttar Pradesh</p>
                      <p className="text-sm text-blue-600 font-medium">India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-500">
              <CardContent className="p-10">
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 mr-4" />
                  <h3 className="text-2xl font-bold">Career Objective</h3>
                </div>
                <p className="text-purple-100 leading-relaxed text-lg">
                  "To work in pragmatic way in an organization where I can show my talent and enhance my skills to meet company 
                  goals and objectives with full integrity and zest. I want to be part of reputed organization which provides a steady 
                  career growth along with job satisfaction, challenges and give value contribution in the success of organization."
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">5+</div>
                <div className="text-gray-600 font-medium">Projects</div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">3+</div>
                <div className="text-gray-600 font-medium">Years Learning</div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">10+</div>
                <div className="text-gray-600 font-medium">Technologies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;