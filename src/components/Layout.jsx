import { memo } from 'react';
import ThemeToggleButton from './ThemeToggleButton.jsx';
import { useState, useEffect } from 'react';

const Layout = ({ children }) => {
  const currentYear = new Date().getFullYear();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for the header with optimized event listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Background decoration elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-200 dark:bg-primary-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 animate-float"></div>
        <div className="absolute top-1/4 -left-24 w-80 h-80 bg-secondary-200 dark:bg-secondary-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-60 animate-float animation-delay-1000"></div>
      </div>

      {/* Header */}
      <header 
        className={`sticky top-0 z-30 px-4 py-3 backdrop-blur-md transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 dark:bg-gray-800/80 shadow-md' 
            : 'bg-white/50 dark:bg-gray-800/50'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/favicon.svg" 
              alt="" 
              className="mr-3 w-8 h-8 animate-pulse-subtle"
              aria-hidden="true"
            />
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent dark:from-primary-400 dark:to-secondary-300 tracking-tight">
              SynapseSprint
            </h1>
          </div>
          <ThemeToggleButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 shadow-inner-soft">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <p className="font-medium">© SynapseSprint {currentYear}</p>
          <div className="mt-2 sm:mt-0 flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" aria-hidden="true"></span>
            <p>Enhance your English skills with adaptive quizzes</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Memoize the layout component to prevent unnecessary re-renders
export default memo(Layout);