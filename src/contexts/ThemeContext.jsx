import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

// Create the context
const ThemeContext = createContext();

// Hook for using the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const [systemTheme, setSystemTheme] = useState('light');

  // Effect to detect system color scheme preference
  useEffect(() => {
    // Function to set the current system theme
    const detectSystemTheme = () => {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setSystemTheme(isDarkMode ? 'dark' : 'light');
    };

    // Detect initial system theme
    detectSystemTheme();

    // Add listener for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Add event listener (use the appropriate method based on browser support)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup function
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Effect to initialize theme based on localStorage or default to system
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  // Effect to apply theme changes to document and save to localStorage
  useEffect(() => {
    // Save current preference to localStorage
    localStorage.setItem('theme', theme);
    
    // Determine which theme to actually apply
    const themeToApply = theme === 'system' ? systemTheme : theme;
    
    // Apply or remove dark class based on effective theme
    if (themeToApply === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, systemTheme]);

  // Memoized toggle function to prevent unnecessary re-renders
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      // Cycle through the themes: light -> dark -> system -> light
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'system';
      return 'light';
    });
  }, []);

  // Memoized function to set a specific theme
  const setSpecificTheme = useCallback((newTheme) => {
    if (['light', 'dark', 'system'].includes(newTheme)) {
      setTheme(newTheme);
    }
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    const effectiveTheme = theme === 'system' ? systemTheme : theme;
    
    return {
      theme,
      effectiveTheme,
      systemTheme,
      toggleTheme,
      setTheme: setSpecificTheme
    };
  }, [theme, systemTheme, toggleTheme, setSpecificTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 