
import React, { useState, useCallback } from 'react';
import { Story, StoryParams } from './types';
import { generateStory } from './services/geminiService';
import StoryInputForm from './components/StoryInputForm';
import StoryDisplay from './components/StoryDisplay';
import LoadingGhost from './components/LoadingGhost';
import ParticleBackground from './components/ParticleBackground';

type GameState = 'start' | 'loading' | 'story' | 'error';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [story, setStory] = useState<Story | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStoryGeneration = useCallback(async (params: StoryParams) => {
    setGameState('loading');
    setError(null);
    try {
      const newStory = await generateStory(params);
      setStory(newStory);
      setGameState('story');
    } catch (err) {
      console.error(err);
      setError('霊魂たちは沈黙しています…物語を呼び出すことができませんでした。もう一度お試しください。');
      setGameState('error');
    }
  }, []);

  const handleReset = () => {
    setGameState('start');
    setStory(null);
    setError(null);
  };

  const renderContent = () => {
    switch (gameState) {
      case 'loading':
        return <LoadingGhost />;
      case 'story':
        return story && <StoryDisplay story={story} onReset={handleReset} />;
      case 'error':
        return (
          <div className="text-center animate-fade-in flex flex-col items-center">
            <p className="text-red-500 text-lg mb-6">{error}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-spooky-orange text-deep-black font-bold rounded-lg shadow-lg hover:bg-orange-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-spooky-orange focus:ring-offset-2 focus:ring-offset-deep-black"
            >
              再試行
            </button>
          </div>
        );
      case 'start':
      default:
        return <StoryInputForm onSubmit={handleStoryGeneration} />;
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
        <ParticleBackground />
        <main className="relative z-10 w-full max-w-2xl">
          {renderContent()}
        </main>
    </div>
  );
};

export default App;
