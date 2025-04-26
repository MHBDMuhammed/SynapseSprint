import { useState, useEffect, memo, useCallback } from 'react';
import { getQuestions } from '../data';

// Memoized option button component
const QuizOption = memo(({ option, onClick, isSelected, isCorrect, isIncorrect, showAnswer, index }) => {
  // Get option classes based on selection state
  const getOptionClasses = () => {
    let baseClasses = `w-full text-left p-4 sm:p-5 rounded-xl transition-all duration-300 border
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50
                     shadow-sm hover:shadow transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm`;
    
    if (isCorrect) {
      return `${baseClasses} bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200`;
    } else if (isIncorrect) {
      return `${baseClasses} bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200`;
    } else if (isSelected) {
      return `${baseClasses} bg-primary-50 dark:bg-primary-900/30 border-primary-300 dark:border-primary-700 text-primary-800 dark:text-primary-200`;
    }
    
    return `${baseClasses} bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/80`;
  };

  return (
    <button
      onClick={() => onClick(option)}
      disabled={showAnswer}
      className={`${getOptionClasses()} animate-scale-in`}
      style={{ animationDelay: `${index * 100}ms` }}
      aria-pressed={isSelected}
      aria-disabled={showAnswer}
    >
      <div className="flex">
        <span className="font-mono bg-gray-100 dark:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-gray-600 dark:text-gray-300 shrink-0">
          {String.fromCharCode(65 + index)}
        </span>
        <span>{option}</span>
      </div>
      {isCorrect && (
        <div className="mt-2 text-green-600 dark:text-green-400 text-sm font-medium flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Correct answer
        </div>
      )}
      {isIncorrect && (
        <div className="mt-2 text-red-600 dark:text-red-400 text-sm font-medium flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          Incorrect answer
        </div>
      )}
    </button>
  );
});

const QuizScreen = ({ quizSettings, onShowResults }) => {
  // State for questions and current question index
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load questions on component mount or when quiz settings change
  useEffect(() => {
    // Fetch questions based on quiz settings
    setLoading(true);
    const loadedQuestions = getQuestions(quizSettings);
    setQuestions(loadedQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setSelectedOption(null);
    setShowAnswer(false);
    setLoading(false);
    
    // Trigger animation
    setVisible(true);
  }, [quizSettings]);

  // Memoized handle option click function
  const handleOptionClick = useCallback((selectedOption) => {
    if (showAnswer || isAnimating) return; // Prevent clicking during animation or when answer is shown
    
    setSelectedOption(selectedOption);
    setShowAnswer(true);
    
    // Store the selected answer
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = selectedOption;
    setSelectedAnswers(newSelectedAnswers);
    
    // Wait 1.5 seconds to show the correct answer before proceeding
    setIsAnimating(true);
    setTimeout(() => {
      // Check if this is the last question
      if (currentQuestionIndex === questions.length - 1) {
        // Calculate score - compare selected answers with correct answers
        const correctAnswersCount = questions.reduce((count, question, index) => {
          return newSelectedAnswers[index] === question.correctAnswer ? count + 1 : count;
        }, 0);

        // Calculate percentage
        const scorePercentage = Math.round((correctAnswersCount / questions.length) * 100);

        // Get incorrect answers for review
        const incorrectAnswers = questions
          .map((question, index) => {
            if (newSelectedAnswers[index] !== question.correctAnswer) {
              return {
                question: question.question,
                yourAnswer: newSelectedAnswers[index],
                correctAnswer: question.correctAnswer
              };
            }
            return null;
          })
          .filter(item => item !== null);

        // Show results
        onShowResults({
          score: correctAnswersCount,
          total: questions.length,
          percentage: scorePercentage,
          incorrectAnswers: incorrectAnswers
        });
      } else {
        // Move to next question with animation
        setIsAnimating(true);
        setVisible(false);
        
        setTimeout(() => {
          // Reset and move to next question
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption(null);
          setShowAnswer(false);
          setVisible(true);
          setIsAnimating(false);
        }, 300);
      }
    }, 1500);
  }, [showAnswer, isAnimating, selectedAnswers, currentQuestionIndex, questions, onShowResults]);

  // If loading or no questions found
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]" aria-live="polite" aria-busy="true">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 mx-auto mb-8"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg">Loading your challenge...</p>
        </div>
      </div>
    );
  }

  // If no questions were found for the selected criteria
  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center animate-fade-in" aria-live="polite">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-400 dark:text-gray-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          No questions available
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Sorry, we couldn't find any questions matching your selected criteria.
        </p>
        <button
          onClick={() => onShowResults({ score: 0, total: 0, percentage: 0 })}
          className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white rounded-lg font-medium
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Current question
  const currentQuestion = questions[currentQuestionIndex];

  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className={`max-w-2xl mx-auto px-4 py-6 sm:py-8 md:py-10 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} aria-live="polite">
      {/* Progress indicator */}
      <div className="mb-8 md:mb-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
            Question {currentQuestionIndex + 1} / {questions.length}
          </span>
          <span className="text-sm sm:text-base font-medium bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
            {quizSettings.level} - {quizSettings.topic}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 shadow-inner-soft overflow-hidden">
          <div 
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2.5 rounded-full transition-all duration-700 ease-in-out shadow-sm" 
            style={{ width: `${progressPercentage}%` }}
            role="progressbar"
            aria-valuenow={Math.round(progressPercentage)}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8 md:mb-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-6 shadow-soft border border-gray-200/50 dark:border-gray-700/50 animate-scale-in">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-gray-800 dark:text-white leading-snug">
          {currentQuestion.question}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Select the best answer below</p>
      </div>

      {/* Options */}
      <div className="space-y-3" role="radiogroup" aria-label="Answer options">
        {currentQuestion.options.map((option, index) => (
          <QuizOption
            key={index}
            option={option}
            onClick={handleOptionClick}
            isSelected={selectedOption === option}
            isCorrect={showAnswer && option === currentQuestion.correctAnswer}
            isIncorrect={showAnswer && selectedOption === option && option !== currentQuestion.correctAnswer}
            showAnswer={showAnswer}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(QuizScreen); 