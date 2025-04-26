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
          <div className="flex flex-col items-center sm:items-start">
            <p className="font-medium">© SynapseSprint {currentYear}</p>
            <a 
              href="https://github.com/MHBDMuhammed/SynapseSprint" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-1 text-primary-600 dark:text-primary-400 hover:underline flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              Açık Kaynak Proje
            </a>
          </div>
          <div className="mt-3 sm:mt-0 flex items-center">
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