import { useEffect, useState, memo } from 'react';

const FeatureCard = memo(({ feature, index, visible }) => (
  <div 
    key={index}
    className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-soft transform transition-all duration-500 ease-out hover:scale-105 hover:shadow-md
               ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
    style={{ transitionDelay: `${300 + index * 100}ms` }}
  >
    <div className="text-3xl mb-3" aria-hidden="true">{feature.icon}</div>
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
  </div>
));

const WelcomeScreen = ({ onStartSetup }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Trigger the animations after component mounts
    setVisible(true);
  }, []);

  const features = [
    { icon: "🎯", title: "Targeted Practice", description: "Quizzes tailored to your proficiency level" },
    { icon: "🧠", title: "Skill Building", description: "Enhance vocabulary and grammar skills" },
    { icon: "📈", title: "Track Progress", description: "See your improvement over time" }
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center py-8 sm:py-12 md:py-16 px-4">
      <div className={`max-w-3xl w-full transition-opacity duration-1000 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Animated logo icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center animate-float">
            <img 
              src="/logo192.svg" 
              alt="SynapseSprint Logo"
              className="w-full h-full" 
            />
          </div>
        </div>
        
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight transition-all duration-700 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <span className="bg-gradient-to-r from-primary-600 via-indigo-500 to-secondary-500 dark:from-primary-400 dark:via-indigo-400 dark:to-secondary-400 bg-clip-text text-transparent">
            SynapseSprint
          </span>
        </h1>
        
        <p className={`text-xl sm:text-2xl mb-10 text-gray-700 dark:text-gray-300 leading-relaxed transition-all duration-700 delay-100 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          Challenge Your Mind, Accelerate Your Learning
        </p>
        
        <div className={`relative mb-16 group transition-all duration-700 delay-200 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {/* Button glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-purple-500 to-secondary-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-500 group-hover:duration-200 animate-pulse-subtle"></div>
          
          <button 
            onClick={onStartSetup}
            className="relative w-64 sm:w-72 py-5 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 dark:from-primary-500 dark:to-secondary-500 dark:hover:from-primary-400 dark:hover:to-secondary-400 text-white text-lg font-medium rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                     transform transition-all duration-300 hover:scale-105 active:scale-95 
                     shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Start Your Sprint"
          >
            <span className="flex items-center justify-center">
              Start Your Sprint
              <svg className="ml-2 w-5 h-5 animate-bounce-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>
        
        {/* Features list with memoized components */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              feature={feature}
              index={index}
              visible={visible}
            />
          ))}
        </div>
        
        <p className={`text-gray-600 dark:text-gray-400 text-sm md:text-base italic max-w-xl mx-auto transition-all duration-700 delay-700 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}>
          Enhance your English skills through adaptive quizzes tailored to your level
        </p>
      </div>
    </div>
  );
};

export default memo(WelcomeScreen); 