import React from 'react';
import { QuizQuestion } from '../types';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  userAnswers: (string | null)[];
  questions: QuizQuestion[];
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({
  score,
  totalQuestions,
  userAnswers,
  questions,
  onRestart,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getResultMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a quiz master!";
    if (percentage >= 70) return "Great job! You really know your stuff!";
    if (percentage >= 50) return "Good effort! You passed the quiz.";
    return "Keep practicing! You'll do better next time.";
  };

  const getResultColor = () => {
    if (percentage >= 90) return "text-indigo-600";
    if (percentage >= 70) return "text-blue-600";
    if (percentage >= 50) return "text-teal-600";
    return "text-orange-600";
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-48 h-48 mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e6e6e6"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={percentage >= 70 ? "#8B5CF6" : percentage >= 50 ? "#0EA5E9" : "#F59E0B"}
                strokeWidth="8"
                strokeDasharray={`${percentage * 2.83} ${283 - percentage * 2.83}`}
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">{percentage}%</span>
              <span className="text-gray-500">Score</span>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
        <p className={`text-xl font-medium ${getResultColor()}`}>
          {getResultMessage()}
        </p>
        <p className="text-lg mt-2">
          You got <span className="font-bold">{score}</span> out of{" "}
          <span className="font-bold">{totalQuestions}</span> questions correct.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Question Summary</h3>
        <div className="space-y-4">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div 
                key={question.id} 
                className={`p-4 rounded-lg border ${
                  isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                }`}
              >
                <p className="font-medium text-gray-800 mb-2">
                  Q{index + 1}: {question.question}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center text-sm gap-2">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-600 mr-1">Your answer:</span>
                    <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                      {userAnswer || "Not answered"}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="flex items-center sm:ml-4">
                      <span className="font-medium text-gray-600 mr-1">Correct answer:</span>
                      <span className="text-green-600">{question.correctAnswer}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Start New Quiz
        </button>
      </div>
    </div>
  );
};

export default Results;