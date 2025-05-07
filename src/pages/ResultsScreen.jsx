import { useState, useEffect } from 'react';

const ResultsScreen = ({ quizResults, onRestart }) => {
  const [visible, setVisible] = useState(false);
  const [showMistakes, setShowMistakes] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setVisible(true), 100);
  }, []);

  // Generate feedback message based on score percentage
  const getFeedbackMessage = (percentage) => {
    if (percentage >= 90) return "Excellent! You're a language master!";
    if (percentage >= 75) return "Great job! You have strong English skills!";
    if (percentage >= 60) return "Good work! Keep building your knowledge.";
    if (percentage >= 40) return "Nice effort! Keep practicing to improve.";
    return "Keep learning! Practice makes perfect.";
  };

  // Get appropriate color class based on score percentage
  const getScoreColorClass = (percentage) => {
    if (percentage >= 90) return { text: "text-green-600 dark:text-green-400", bg: "bg-green-600 dark:bg-green-400", gradient: "from-green-500 to-emerald-500" };
    if (percentage >= 75) return { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-600 dark:bg-emerald-400", gradient: "from-emerald-500 to-teal-500" };
    if (percentage >= 60) return { text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-600 dark:bg-blue-400", gradient: "from-blue-500 to-indigo-500" };
    if (percentage >= 40) return { text: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-600 dark:bg-yellow-400", gradient: "from-yellow-500 to-amber-500" };
    return { text: "text-red-600 dark:text-red-400", bg: "bg-red-600 dark:bg-red-400", gradient: "from-red-500 to-pink-500" };
  };

  // Get appropriate emoji based on score percentage
  const getEmoji = (percentage) => {
    if (percentage >= 90) return { emoji: "🏆", label: "Champion" };
    if (percentage >= 75) return { emoji: "🌟", label: "Star" };
    if (percentage >= 60) return { emoji: "👍", label: "Good" };
    if (percentage >= 40) return { emoji: "🔍", label: "Getting There" };
    return { emoji: "📚", label: "Keep Learning" };
  };

  const scoreColor = getScoreColorClass(quizResults.percentage);
  const feedbackMessage = getFeedbackMessage(quizResults.percentage);
  const emojiData = getEmoji(quizResults.percentage);

  // Calculate circle circumference for progress circle
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (quizResults.percentage / 100) * circumference;

  // Check if there are any incorrect answers to show
  const hasMistakes = quizResults.incorrectAnswers && quizResults.incorrectAnswers.length > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 md:py-12 flex flex-col items-center justify-center text-center">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/3 right-1/4 w-96 h-96 rounded-full ${visible ? 'opacity-10' : 'opacity-0'} 
                         transition-opacity duration-1000 bg-gradient-to-r ${scoreColor.gradient} 
                         blur-3xl mix-blend-multiply dark:mix-blend-normal`}
             style={{ transitionDelay: '300ms' }}></div>
        <div className={`absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full ${visible ? 'opacity-10' : 'opacity-0'} 
                         transition-opacity duration-1000 bg-gradient-to-r from-primary-500 to-secondary-500 
                         blur-3xl mix-blend-multiply dark:mix-blend-normal`}
             style={{ transitionDelay: '600ms' }}></div>
      </div>
      
      {/* Results content */}
      <div className={`relative z-10 w-full max-w-xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-soft border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          {/* Result header with colored top bar */}
          <div className={`h-2 bg-gradient-to-r ${scoreColor.gradient}`}></div>
          
          <div className="p-8 md:p-10">
            <h1 className={`text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent animate-scale-in`}>
              Sprint Complete!
            </h1>
            
            <div className={`text-xl text-gray-600 dark:text-gray-400 mb-8 animate-fade-in`} style={{ animationDelay: '300ms' }}>
              Great effort on your {quizResults.total}-question quiz!
            </div>
            
            {/* Score circle visualization */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-8">
              <div className={`relative w-40 h-40 transition-all duration-1000 ${visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                <svg className="w-full h-full transform" viewBox="0 0 152 152">
                  <circle
                    cx="76"
                    cy="76"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="76"
                    cy="76"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={circumference}
                    strokeDashoffset={visible ? strokeDashoffset : circumference}
                    strokeLinecap="round"
                    strokeWidth="12"
                    className={`${scoreColor.text} transition-all duration-1000 ease-out`}
                  />
                  <text
                    x="76"
                    y="76"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="28"
                    fontWeight="bold"
                    fill="currentColor"
                    className="text-gray-800 dark:text-gray-200"
                  >
                    {quizResults.percentage}%
                  </text>
                </svg>
                <div className={`absolute top-0 right-0 -mt-2 -mr-2 text-3xl animate-float`}>
                  {emojiData.emoji}
                </div>
              </div>
              
              <div className={`flex flex-col items-center md:items-start transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{ transitionDelay: '500ms' }}>
                <div className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-1">Your Score</div>
                <div className={`text-4xl font-bold mb-2 ${scoreColor.text}`}>
                  {quizResults.score} / {quizResults.total}
                </div>
                <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-2">
                  Level: <span className="text-primary-600 dark:text-primary-400">{emojiData.label}</span>
                </div>
              </div>
            </div>
            
            {/* Feedback message */}
            <div className={`my-8 px-6 py-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600/50 transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '700ms' }}>
              <p className="text-xl text-gray-800 dark:text-gray-200 font-medium">
                {feedbackMessage}
              </p>
            </div>
            
            {/* Incorrect answers section */}
            {hasMistakes && (
              <div className={`mt-8 transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '800ms' }}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Review Your Answers</h3>
                  <button 
                    onClick={() => setShowMistakes(!showMistakes)}
                    className="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {showMistakes ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                {showMistakes && (
                  <div className="space-y-4 mt-4 max-h-96 overflow-y-auto px-1 animate-fade-in">
                    {quizResults.incorrectAnswers.map((item, index) => (
                      <div 
                        key={index} 
                        className="p-4 rounded-lg bg-white dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600 shadow-sm text-left"
                      >
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">{item.question}</h4>
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center mr-2 mt-0.5">
                              <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </span>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Your answer:</p>
                              <p className="text-red-600 dark:text-red-400">{item.yourAnswer}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mr-2 mt-0.5">
                              <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Correct answer:</p>
                              <p className="text-green-600 dark:text-green-400">{item.correctAnswer}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Action buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '900ms' }}>
              <button 
                onClick={onRestart}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white rounded-lg font-medium text-lg
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                         transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-md
                         flex items-center justify-center min-w-[200px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Try Another Sprint
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen; 