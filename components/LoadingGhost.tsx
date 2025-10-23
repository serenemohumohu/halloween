
import React from 'react';

const LoadingGhost: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center animate-fade-in" aria-live="polite" aria-busy="true">
      <div className="relative w-24 h-32 animate-float">
        <div className="absolute top-0 left-0 w-full h-24 bg-gray-200 rounded-t-full"></div>
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <div className="w-4 h-4 bg-deep-black rounded-full"></div>
          <div className="w-4 h-4 bg-deep-black rounded-full"></div>
        </div>
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-deep-black rounded-full border-2 border-gray-200"></div>
        <div className="absolute bottom-0 left-0 w-full h-8 flex">
          <div className="w-1/3 h-full bg-gray-200 rounded-bl-2xl"></div>
          <div className="w-1/3 h-full bg-transparent transform -translate-y-2">
             <div className="w-full h-full bg-gray-200 rounded-full"></div>
          </div>
          <div className="w-1/3 h-full bg-gray-200 rounded-br-2xl"></div>
        </div>
      </div>
      <p className="font-creepster text-2xl text-spooky-orange text-glow mt-6 tracking-wider">
        霊魂たちと交信中...
      </p>
    </div>
  );
};

export default LoadingGhost;
