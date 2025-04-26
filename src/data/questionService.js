/**
 * Question Service
 * Handles loading and filtering questions from JSON files
 */

// Import question sets
import a1Questions from './questions/A1.json';
import a2Questions from './questions/A2.json';
import b1Questions from './questions/B1.json';
import b2Questions from './questions/B2.json';
import c1Questions from './questions/C1.json';
import c2Questions from './questions/C2.json';

// Map of all questions by level
const questionsByLevel = {
  A1: a1Questions,
  A2: a2Questions,
  B1: b1Questions,
  B2: b2Questions,
  C1: c1Questions,
  C2: c2Questions
};

/**
 * Get questions based on quiz settings
 * @param {Object} quizSettings - Object containing level, topic, and questionCount
 * @returns {Array} - Array of questions matching the criteria
 */
export const getQuestions = (quizSettings) => {
  const { level, topic, questionCount } = quizSettings;
  
  // Get questions for the selected level
  const levelQuestions = questionsByLevel[level] || [];
  
  // Filter by topic if specified (not 'Mixed')
  const filteredQuestions = topic === 'Mixed' 
    ? levelQuestions 
    : levelQuestions.filter(q => q.topic === topic);
  
  // Randomize the order of questions
  const shuffledQuestions = shuffleArray([...filteredQuestions]);
  
  // Return the requested number of questions or all if not enough
  return shuffledQuestions.slice(0, questionCount);
};

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - The shuffled array
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default {
  getQuestions
}; 