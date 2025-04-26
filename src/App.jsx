import { useState, useCallback, useMemo } from 'react'
import Layout from './components/Layout.jsx'
import WelcomeScreen from './pages/WelcomeScreen.jsx'
import SetupScreen from './pages/SetupScreen.jsx'
import QuizScreen from './pages/QuizScreen.jsx'
import ResultsScreen from './pages/ResultsScreen.jsx'
import SEO from './components/SEO.jsx'
import StructuredData from './components/StructuredData.jsx'

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

  // Generate SEO metadata based on current screen
  const seoMetadata = useMemo(() => {
    switch (currentScreen) {
      case 'welcome':
        return {
          title: 'SynapseSprint - Enhance Your English Skills',
          description: 'Challenge your mind and accelerate your English learning with adaptive quizzes tailored to your level.',
          canonicalUrl: '/',
          keywords: 'english learning, language app, vocabulary practice, grammar quiz, adaptive learning'
        };
      case 'setup':
        return {
          title: 'Customize Your Learning Experience - SynapseSprint',
          description: 'Select your proficiency level and topics to create a personalized English learning quiz experience.',
          canonicalUrl: '/setup',
          keywords: 'english quiz setup, language level, customize learning, personalized quiz'
        };
      case 'quiz':
        return {
          title: `${quizSettings?.level || 'English'} Quiz - SynapseSprint`,
          description: `Test your ${quizSettings?.level || 'English'} language skills with interactive quizzes focused on ${quizSettings?.topic?.label || 'various topics'}.`,
          canonicalUrl: '/quiz',
          keywords: 'english test, interactive quiz, language assessment, vocabulary test, grammar practice'
        };
      case 'results':
        return {
          title: 'Quiz Results - SynapseSprint',
          description: 'Review your English quiz performance and gain insights to improve your language skills.',
          canonicalUrl: '/results',
          keywords: 'quiz results, language assessment, learning progress, performance review'
        };
      default:
        return {
          title: 'SynapseSprint - English Learning App',
          description: 'Enhance your English skills with adaptive quizzes tailored to your level',
          canonicalUrl: '/',
          keywords: 'english quiz, language learning, adaptive learning, vocabulary, grammar practice'
        };
    }
  }, [currentScreen, quizSettings]);

  // Generate structured data based on current screen
  const structuredDataInfo = useMemo(() => {
    switch (currentScreen) {
      case 'welcome':
        return {
          type: 'website',
          data: {
            name: 'SynapseSprint',
            url: 'https://synapsesprint.vercel.app/',
            description: 'Enhance your English skills with adaptive quizzes tailored to your level'
          }
        };
      case 'setup':
        return {
          type: 'learningResource',
          data: {
            level: 'All Levels'
          }
        };
      case 'quiz':
        return {
          type: 'courseInstance',
          data: {
            level: quizSettings?.level || 'English',
            topic: quizSettings?.topic?.label || 'various topics'
          }
        };
      case 'results':
        return {
          type: 'quizAnswer',
          data: {
            level: quizSettings?.level || 'English'
          }
        };
      default:
        return {
          type: 'website',
          data: {}
        };
    }
  }, [currentScreen, quizSettings]);

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
    <>
      <SEO {...seoMetadata} />
      <StructuredData {...structuredDataInfo} />
      <Layout>
        {screenContent}
      </Layout>
    </>
  );
}

export default App
