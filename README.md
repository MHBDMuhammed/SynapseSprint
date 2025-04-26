# SynapseSprint - Advanced English Quiz Application

SynapseSprint is a modern, interactive web application designed to help users improve their English language skills through engaging quizzes. The application offers customizable quizzes across different proficiency levels and topics, providing immediate feedback and performance tracking.

## Features

- **Fully Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Light and Dark Theme**: Automatically detects system preferences with manual toggle option
- **Multiple Difficulty Levels**: Six proficiency levels from A1 (Beginner) to C2 (Proficient)
- **Various Quiz Topics**: Grammar, Vocabulary, and Mixed question sets
- **Customizable Quiz Length**: Choose between 5, 10, or 15 questions per session
- **Immediate Feedback**: Get instant feedback on correct and incorrect answers
- **Performance Tracking**: View your score and performance analysis after quiz completion

## Application Flow

1. **Welcome Screen**: Introduction with app name and "Start Your Sprint" button
2. **Setup Screen**: Configure quiz settings (difficulty level, topic, question count)
3. **Quiz Screen**: Interactive quiz with progress tracking and timer
4. **Results Screen**: Performance summary with option to restart

## Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useContext)

## Project Structure

```
src/
├── assets/         # Images, icons, and other static assets
├── components/     # Reusable UI components
│   ├── Layout.jsx  # Main layout wrapper with header/footer
│   └── ThemeToggleButton.jsx  # Theme switching component
├── contexts/       # React context providers
│   └── ThemeContext.jsx  # Dark/light theme management
├── data/           # Question data and services
│   ├── questions/  # Question sets by difficulty level (A1-C2)
│   └── questionService.js  # Service to fetch and filter questions
├── pages/          # Main application screens
│   ├── WelcomeScreen.jsx  # Landing page
│   ├── SetupScreen.jsx    # Quiz configuration
│   ├── QuizScreen.jsx     # Active quiz interface
│   └── ResultsScreen.jsx  # Quiz results and feedback
├── App.jsx         # Main application component
└── main.jsx        # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 14.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/synapsesprint.git
   cd synapsesprint
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```
npm run build
```

The build artifacts will be stored in the `dist/` directory, ready for deployment.

## Preview Production Build

```
npm run preview
```

## Future Enhancements

- User authentication and profiles
- Saved quiz history
- Expanded question database
- Timed quiz modes
- Leaderboards and social sharing
- Pronunciation exercises
- Writing assessments

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- English proficiency levels based on the Common European Framework of Reference for Languages (CEFR)
- Tailwind CSS for the responsive design system
- React and Vite teams for the excellent development tools
