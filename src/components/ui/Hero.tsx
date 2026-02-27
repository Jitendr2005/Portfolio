import React, { useRef, useState } from 'react';
import { ArrowDown, Github, Linkedin, Instagram, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const heroRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [circleAnim, setCircleAnim] = useState(false);
  const [bgAnim, setBgAnim] = useState(false);

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (heroRef.current as HTMLElement)?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMouse({ x, y });
    }
  };

  // Click handler for main circle
  const handleCircleClick = () => {
    setCircleAnim(true);
    setTimeout(() => setCircleAnim(false), 600);
  };

  // Click handler for all bg
  const handleBgClick = () => {
    setBgAnim(true);
    setTimeout(() => setBgAnim(false), 400);
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/90 to-indigo-900"
      onMouseMove={handleMouseMove}
      onClick={handleBgClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse transition-transform duration-300 ${bgAnim ? 'scale-110' : ''}`}
          style={{
            transform: `translate(${(mouse.x - 0.5) * 40}px, ${(mouse.y - 0.5) * 40}px)`
          }}
        ></div>
        <div
          className={`absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000 transition-transform duration-300 ${bgAnim ? 'scale-110' : ''}`}
          style={{
            transform: `translate(${(mouse.x - 0.5) * -30}px, ${(mouse.y - 0.5) * 30}px)`
          }}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse animation-delay-4000 transition-transform duration-300 ${bgAnim ? 'scale-110' : ''}`}
          style={{
            transform: `translate(${(mouse.x - 0.5) * 20}px, ${(mouse.y - 0.5) * -20}px)`
          }}
        ></div>
        {/* Color code-based animated circle (interactive) */}
        <div
          className={`absolute w-40 h-40 rounded-full opacity-40 animate-pulse transition-transform duration-500 ${circleAnim ? 'scale-125 rotate-12' : ''}`}
          style={{
            left: `calc(${mouse.x * 100}% - 5rem)`,
            top: `calc(${mouse.y * 100}% - 5rem)`,
            background: 'radial-gradient(circle, #00FFAA 60%, transparent 100%)',
            filter: 'blur(24px)',
            mixBlendMode: 'screen',
            cursor: 'pointer',
          }}
          onClick={e => { e.stopPropagation(); handleCircleClick(); }}
        ></div>
        {/* Floating particles (parallax) */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-pulse transition-transform duration-300"
          style={{ transform: `translate(${(mouse.x - 0.5) * 60}px, ${(mouse.y - 0.5) * 60}px)` }}
        ></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-300/40 rounded-full animate-pulse animation-delay-2000 transition-transform duration-300"
          style={{ transform: `translate(${(mouse.x - 0.5) * -50}px, ${(mouse.y - 0.5) * 50}px)` }}
        ></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-blue-300/30 rounded-full animate-pulse animation-delay-4000 transition-transform duration-300"
          style={{ transform: `translate(${(mouse.x - 0.5) * 30}px, ${(mouse.y - 0.5) * -30}px)` }}
        ></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          {/* Enhanced Profile Image */}
          <div className="mb-8 inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-50 animate-pulse"></div>
            <div className="relative w-36 h-36 mx-auto rounded-full border-4 border-white/30 shadow-2xl overflow-hidden backdrop-blur-sm bg-gradient-to-br from-white/20 to-white/5 p-1 transition-transform transform hover:scale-110 hover:shadow-2xl hover:border-white/50 duration-500 ease-in-out">
             
              <img src="Public/profile.png" alt="My Photo" className="w-48 h-48 rounded-full mx-auto shadow-lg" />

            </div>
            <div className="absolute -top-2 -right-2 animate-pulse  rounded-full p-2 shadow-lg transform hover:scale-110 transition-transform duration-500 ease-in-out ">
              <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse hover:animate-pulse transition-all duration-350 ease-in-out">
              Jitendra
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-4 max-w-4xl mx-auto leading-relaxed">
            Computer Science Student & Full Stack Developer
          </p>
          
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Specializing in{' '}
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold ">
              Python, AI/ML, and Web Development
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <a
              href="/portfolio/Jitendra_Tyagi_resume.pdf"
              download
              className="group bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-10 py-4 rounded-full transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-lg border border-white/20 text-lg inline-flex items-center justify-center"
            >
              <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Download Resume
            </a>
            
            <div className="flex gap-6">
              <a 
                href="https://github.com/Jitendr2005/Jitendratyagii" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 transform hover:scale-125 hover:shadow-xl"
              >
                <Github className="h-6 w-6 text-white group-hover:text-purple-300 transition-colors duration-300" />
              </a>
              <a 
                href="https://www.linkedin.com/in/jitendra-tyagi-a82945240" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 transform hover:scale-125 hover:shadow-xl"
              >
                <Linkedin className="h-6 w-6 text-white group-hover:text-blue-300 transition-colors duration-300" />
              </a>
              <a 
                href="https://www.instagram.com/tyagijitendraa__" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 transform hover:scale-125 hover:shadow-xl"
              >
                <Instagram className="h-6 w-6 text-white group-hover:text-pink-300 transition-colors duration-300" />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom--12 left-1/(1/2) transform -translate-x-1 animate-bounce "> "
          <Button 
            className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-6 py-3 rounded-full flex items-center gap-4 transition-all duration-800 transform hover:scale-110 shadow-lg hover:shadow-2xl "
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            Scroll Down
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </Button> 
        </div>
      </div>

    </section>
  );
}

export default Hero;
