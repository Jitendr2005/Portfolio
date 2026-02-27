import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    
    // Listen for storage changes (logout from other tab)
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-purple-200/30' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-18">
          {/* Enhanced Logo */}
          <div className="font-bold text-2xl flex items-center">
            <Sparkles className={`h-6 w-6 mr-2 transition-colors duration-300 ${
              isScrolled ? 'text-purple-600' : 'text-purple-400'
            }`} />
            <span className={`transition-colors duration-300 bg-gradient-to-r bg-clip-text text-transparent ${
              isScrolled 
                ? 'from-purple-600 to-blue-600' 
                : 'from-white to-purple-200'
            }`}>
              Jitendra
            </span>
            <span className={`transition-colors duration-300 ${
              isScrolled ? 'text-purple-600' : 'text-purple-400'
            }`}>.</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`relative font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-purple-600' 
                    : 'text-gray-200 hover:text-white'
                } group`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
            
            {isAuthenticated ? (
              <>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-all duration-500"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-8 py-2 rounded-full transition-all duration-500 transform hover:scale-110 shadow-lg border border-white/20"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-8 py-2 rounded-full transition-all duration-500 transform hover:scale-110 shadow-lg border border-white/20"
                  onClick={() => scrollToSection('#contact')}
                >
                  Let's Talk
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-3 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-900 hover:bg-purple-100' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-purple-200/30 rounded-b-2xl shadow-2xl">
            <div className="px-6 py-8 space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left font-medium text-gray-700 hover:text-purple-600 transition-all duration-300 py-3 text-lg hover:translate-x-2"
                >
                  {item.label}
                </button>
              ))}
              
              {isAuthenticated ? (
                <>
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full transition-all duration-500"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white py-3 rounded-full transition-all duration-500 shadow-lg"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white py-3 rounded-full transition-all duration-500 shadow-lg"
                    onClick={() => scrollToSection('#contact')}
                  >
                    Let's Talk
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                </>
              )}            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;