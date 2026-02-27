import React from 'react';
import Navigation from '@/components/ui/Navigation';
import Hero from '@/components/ui/Hero';
import About from '@/components/ui/About';
import Skills from '@/components/ui/Skills';
import Projects from '@/components/ui/Projects';
import Contact from '@/components/ui/Contact';
import Footer from '@/components/ui/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
