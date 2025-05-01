import React, { useState, useEffect } from 'react';
import Question from './Question';
import ProgressBar from './ProgressBar';
import Results from './Results';
import { QuizQuestion, QuizState } from '../types';
import { ArrowRight, RotateCcw } from 'lucide-react';

interface QuizAppProps {
  questions: QuizQuestion[];
}

const QuizApp: React.FC<QuizAppProps> = ({ questions }) => {
  const initialState: QuizState = {
    currentQuestionIndex: 0,
    selectedAnswer: null,
    answered: false,
    score: 0,
    showResults: false,
    userAnswers: Array(questions.length).fill(null),
  };

  const [quizState, setQuizState] = useState<QuizState>(initialState);
  const [animateQuestion, setAnimateQuestion] = useState(false);
  
  const currentQuestion = questions[quizState.currentQuestionIndex];

  useEffect(() => {
    // Add animate-in class for the first question on mount
    setTimeout(() => setAnimateQuestion(true), 100);
  }, []);

  const handleSelectAnswer = (answer: string) => {
    setQuizState((prevState) => ({
      ...prevState,
      selectedAnswer: answer,
    }));
  };

  const handleSubmitAnswer = () => {
    const { selectedAnswer, currentQuestionIndex } = quizState;
    
    if (!selectedAnswer) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setQuizState((prevState) => {
      const newUserAnswers = [...prevState.userAnswers];
      newUserAnswers[currentQuestionIndex] = selectedAnswer;
      
      return {
        ...prevState,
        answered: true,
        score: isCorrect ? prevState.score + 1 : prevState.score,
        userAnswers: newUserAnswers,
      };
    });
  };

  const handleNextQuestion = () => {
    const nextIndex = quizState.currentQuestionIndex + 1;
    
    if (nextIndex >= questions.length) {
      setQuizState((prevState) => ({
        ...prevState,
        showResults: true,
      }));
      return;
    }
    
    // Start transition animation out
    setAnimateQuestion(false);
    
    // Delay state update to allow for animation
    setTimeout(() => {
      setQuizState((prevState) => ({
        ...prevState,
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        answered: false,
      }));
      
      // Trigger animation for the new question
      setTimeout(() => setAnimateQuestion(true), 50);
    }, 300);
  };

  const handleRestartQuiz = () => {
    setAnimateQuestion(false);
    
    setTimeout(() => {
      setQuizState(initialState);
      setTimeout(() => setAnimateQuestion(true), 50);
    }, 300);
  };

  if (quizState.showResults) {
    return (
      <Results
        score={quizState.score}
        totalQuestions={questions.length}
        userAnswers={quizState.userAnswers}
        questions={questions}
        onRestart={handleRestartQuiz}
      />
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm font-medium text-gray-600">
          Question {quizState.currentQuestionIndex + 1} of {questions.length}
        </div>
        
        <button
          onClick={handleRestartQuiz}
          className="flex items-center text-sm text-purple-600 hover:text-purple-800"
        >
          <RotateCcw size={16} className="mr-1" />
          Restart Quiz
        </button>
      </div>
      
      <ProgressBar
        current={quizState.currentQuestionIndex + 1}
        total={questions.length}
      />
      
      <div className={`transform transition-all duration-300 ease-in-out ${
        animateQuestion 
          ? 'translate-x-0 opacity-100' 
          : 'translate-x-8 opacity-0'
      }`}>
        <Question
          question={currentQuestion}
          selectedAnswer={quizState.selectedAnswer}
          answered={quizState.answered}
          onSelectAnswer={handleSelectAnswer}
        />
      </div>
      
      <div className="mt-8 flex justify-between">
        {!quizState.answered ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={!quizState.selectedAnswer}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
              quizState.selectedAnswer
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
          >
            {quizState.currentQuestionIndex === questions.length - 1 ? 'Show Results' : 'Next Question'}
            <ArrowRight size={18} className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizApp;