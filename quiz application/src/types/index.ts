export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  answered: boolean;
  score: number;
  showResults: boolean;
  userAnswers: (string | null)[];
}