import { useState, useCallback, useMemo } from 'react'
import Layout from './components/Layout.jsx'
import WelcomeScreen from './pages/WelcomeScreen.jsx'
import SetupScreen from './pages/SetupScreen.jsx'
import QuizScreen from './pages/QuizScreen.jsx'
import ResultsScreen from './pages/ResultsScreen.jsx'

function App() {
  // Screen state management
  const [currentScreen, setCurrentScreen] = useState('welcome');
  
  // Quiz settings state
  const [quizSettings, setQuizSettings] = useState({
    level: null,
    topic: null,
    questionCount: null
  });
  
  // Quiz results state
  const [quizResults, setQuizResults] = useState(null);

  // Memoized navigation handler functions
  const handleStartSetup = useCallback(() => {
    setCurrentScreen('setup');
  }, []);

  const handleStartQuiz = useCallback((settings) => {
    // Update quiz settings with user's selections
    setQuizSettings(settings);
    setCurrentScreen('quiz');
  }, []);

  const handleShowResults = useCallback((results) => {
    // Store quiz results
    setQuizResults(results);
    setCurrentScreen('results');
  }, []);

  const handleRestart = useCallback(() => {
    // Reset to setup screen to play again
    setCurrentScreen('setup');
  }, []);

  // Memoized screen rendering based on current state
  const screenContent = useMemo(() => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStartSetup={handleStartSetup} />;
      
      case 'setup':
        return <SetupScreen onStartQuiz={handleStartQuiz} />;
      
      case 'quiz':
        return <QuizScreen quizSettings={quizSettings} onShowResults={handleShowResults} />;
      
      case 'results':
        return quizResults ? (
          <ResultsScreen quizResults={quizResults} onRestart={handleRestart} />
        ) : (
          <div className="text-center">Loading results...</div>
        );
      
      default:
        return <div>Unknown screen</div>;
    }
  }, [currentScreen, quizSettings, quizResults, handleStartSetup, handleStartQuiz, handleShowResults, handleRestart]);

  return (
    <Layout>
      {screenContent}
    </Layout>
  );
}

export default App
