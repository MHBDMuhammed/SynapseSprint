import { useState, useEffect, useCallback, memo } from 'react';

// Memoized option button component
const OptionButton = memo(({ item, isSelected, onClick, animationDelay, type }) => (
  <button
    onClick={() => onClick(item)}
    className={`${isSelected
      ? 'p-3 rounded-lg border text-center transition-all duration-200 bg-primary-50 dark:bg-primary-900/30 border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300 transform scale-105 shadow-md'
      : 'p-3 rounded-lg border text-center transition-all duration-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/80 hover:shadow-sm'
    } animate-scale-in`}
    style={{ animationDelay: `${animationDelay}ms` }}
    aria-pressed={isSelected}
  >
    {type === 'topic' && <div className="text-2xl mb-1" aria-hidden="true">{item.icon}</div>}
    <div className={type === 'level' ? "font-bold text-lg" : "font-medium"}>{item.label}</div>
    {(type === 'level' || type === 'count') && (
      <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">{item.description}</div>
    )}
  </button>
));

const SetupScreen = ({ onStartQuiz }) => {
  const [settings, setSettings] = useState({
    level: null,
    topic: null,
    questionCount: null
  });
  
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Trigger the animations after component mounts
    setVisible(true);
  }, []);

  // Available options
  const levels = [
    { id: 'A1', label: 'A1', description: 'Beginner' },
    { id: 'A2', label: 'A2', description: 'Elementary' },
    { id: 'B1', label: 'B1', description: 'Intermediate' },
    { id: 'B2', label: 'B2', description: 'Upper Intermediate' },
    { id: 'C1', label: 'C1', description: 'Advanced' },
    { id: 'C2', label: 'C2', description: 'Proficiency' }
  ];

  const topics = [
    { id: 'Grammar', label: 'Grammar', icon: '📝' },
    { id: 'Vocabulary', label: 'Vocabulary', icon: '📚' },
    { id: 'Mixed', label: 'Mixed', icon: '🔄' }
  ];

  const questionCounts = [
    { id: 5, label: '5 Questions', description: 'Quick Sprint', icon: '🏃' },
    { id: 10, label: '10 Questions', description: 'Standard Sprint', icon: '⚡' },
    { id: 15, label: '15 Questions', description: 'Extended Sprint', icon: '🔥' }
  ];

  // Option selection handlers - memoized for performance
  const handleLevelSelect = useCallback((level) => {
    setSettings(prev => ({ ...prev, level: level.id }));
  }, []);

  const handleTopicSelect = useCallback((topic) => {
    setSettings(prev => ({ ...prev, topic: topic.id }));
  }, []);

  const handleQuestionCountSelect = useCallback((count) => {
    setSettings(prev => ({ ...prev, questionCount: count.id }));
  }, []);

  // Check if all settings are selected
  const isConfigComplete = settings.level && settings.topic && settings.questionCount;

  return (
    <div className={`max-w-2xl mx-auto px-4 py-6 sm:py-8 md:py-10 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
        Configure Your Sprint
      </h1>
      
      <p className="mb-8 text-center text-gray-700 dark:text-gray-300">
        Select your quiz preferences to tailor the challenge to your skill level.
      </p>
      
      <div className="space-y-8">
        {/* Level Selection */}
        <div 
          className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
          style={{ transitionDelay: '100ms' }}
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
            <span className="bg-primary-100 dark:bg-primary-900/50 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-primary-600 dark:text-primary-300" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
            Difficulty Level
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Select difficulty level">
            {levels.map((level, index) => (
              <OptionButton
                key={level.id}
                item={level}
                isSelected={settings.level === level.id}
                onClick={handleLevelSelect}
                animationDelay={index * 75}
                type="level"
              />
            ))}
          </div>
        </div>
        
        {/* Topic Selection */}
        <div 
          className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
          style={{ transitionDelay: '200ms' }}
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
            <span className="bg-secondary-100 dark:bg-secondary-900/50 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-secondary-600 dark:text-secondary-300" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </span>
            Quiz Topic
          </h2>
          <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Select quiz topic">
            {topics.map((topic, index) => (
              <OptionButton
                key={topic.id}
                item={topic}
                isSelected={settings.topic === topic.id}
                onClick={handleTopicSelect}
                animationDelay={300 + index * 75}
                type="topic"
              />
            ))}
          </div>
        </div>
        
        {/* Question Count Selection */}
        <div 
          className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
          style={{ transitionDelay: '300ms' }}
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
            <span className="bg-purple-100 dark:bg-purple-900/50 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-purple-600 dark:text-purple-300" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </span>
            Number of Questions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Select number of questions">
            {questionCounts.map((count, index) => (
              <OptionButton
                key={count.id}
                item={count}
                isSelected={settings.questionCount === count.id}
                onClick={handleQuestionCountSelect}
                animationDelay={500 + index * 75}
                type="count"
              />
            ))}
          </div>
        </div>
        
        {/* Start Button */}
        <div className={`pt-4 flex justify-center transition-all duration-500 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button 
            onClick={() => onStartQuiz(settings)}
            disabled={!isConfigComplete}
            className={`px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white rounded-lg font-medium text-lg
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                       transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-md
                       disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none
                       ${isConfigComplete ? 'animate-pulse-subtle' : ''}`}
            aria-label={isConfigComplete ? "Start Quiz" : "Select all options to start quiz"}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Start Quiz
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(SetupScreen); 