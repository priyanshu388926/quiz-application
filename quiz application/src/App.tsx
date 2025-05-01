import React from 'react';
import QuizApp from './components/QuizApp';
import quizData from './data/quizData';
import { Brain } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-lg">
              <Brain size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
            BrainQuest
          </h1>
          <p className="text-gray-600 mt-2 max-w-lg mx-auto">
            Test your knowledge with our interactive quiz challenge
          </p>
        </header>
        
        <main className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fade-in">
          <QuizApp questions={quizData} />
        </main>
        
        <footer className="mt-10 text-center text-sm text-gray-500">
          <p>© 2025 BrainQuest. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;