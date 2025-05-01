import React from 'react';
import { QuizQuestion } from '../types';
import { Check, X } from 'lucide-react';

interface QuestionProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  answered: boolean;
  onSelectAnswer: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  selectedAnswer,
  answered,
  onSelectAnswer,
}) => {
  const getOptionStyles = (option: string) => {
    const baseStyles = "flex flex-col items-start w-full p-5 rounded-lg border-2 transition-all duration-300 transform hover:shadow-md";
    
    if (!answered) {
      return selectedAnswer === option
        ? "bg-purple-100 border-purple-500 text-purple-800 shadow-sm"
        : "bg-white border-gray-200 text-gray-800 hover:border-purple-300 hover:bg-purple-50";
    }
    
    if (option === question.correctAnswer) {
      return "bg-green-100 border-green-500 text-green-800 shadow-sm";
    }
    
    if (selectedAnswer === option && option !== question.correctAnswer) {
      return "bg-red-100 border-red-500 text-red-800 shadow-sm";
    }
    
    return "bg-white border-gray-200 text-gray-500 opacity-70";
  };

  const getCheckboxStyles = (option: string) => {
    const baseStyles = "w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all duration-300";
    
    if (!answered) {
      return selectedAnswer === option
        ? "border-purple-500 bg-purple-500 text-white"
        : "border-gray-300 bg-white";
    }
    
    if (option === question.correctAnswer) {
      return "border-green-500 bg-green-500 text-white";
    }
    
    if (selectedAnswer === option && option !== question.correctAnswer) {
      return "border-red-500 bg-red-500 text-white";
    }
    
    return "border-gray-300 bg-white";
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800">
        {question.question}
      </h2>
      <div className="space-y-4">
        {question.options.map((option) => (
          <button
            key={option}
            className={`${getOptionStyles(option)}`}
            onClick={() => !answered && onSelectAnswer(option)}
            disabled={answered}
          >
            <div className="flex items-center gap-4 w-full">
              <div className={getCheckboxStyles(option)}>
                {selectedAnswer === option && !answered && <Check size={16} className="text-white" />}
                {answered && option === question.correctAnswer && <Check size={16} className="text-white" />}
                {answered && selectedAnswer === option && option !== question.correctAnswer && <X size={16} className="text-white" />}
              </div>
              <span className="text-left">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;