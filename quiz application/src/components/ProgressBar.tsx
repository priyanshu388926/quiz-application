import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.floor((current / total) * 100);
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 overflow-hidden">
      <div 
        className="bg-gradient-to-r from-violet-500 to-purple-700 h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
};

export default ProgressBar;