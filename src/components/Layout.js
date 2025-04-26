import ThemeToggleButton from './ThemeToggleButton';

const Layout = ({ children }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            SynapseSprint
          </h1>
          <ThemeToggleButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6 md:py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <p>© SynapseSprint {currentYear}</p>
          <p className="mt-2 md:mt-0">Enhance your English skills with adaptive quizzes</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 