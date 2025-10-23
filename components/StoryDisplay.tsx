
import React, { useState, useEffect } from 'react';
import { Story } from '../types';
import { ShareIcon, RedoIcon } from './Icons';
import IconButton from './IconButton';

interface StoryDisplayProps {
  story: Story;
  onReset: () => void;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, onReset }) => {
  const [displayedContent, setDisplayedContent] = useState('');

  useEffect(() => {
    setDisplayedContent('');
    let charIndex = 0;
    const intervalId = setInterval(() => {
      if (charIndex < story.content.length) {
        setDisplayedContent((prev) => prev + story.content.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 25); // Adjust for typing speed

    return () => clearInterval(intervalId);
  }, [story]);
  
  const handleShare = async () => {
    const shareData = {
      title: `スピリット・ストーリー: ${story.title}`,
      text: `${story.content}\n\nSpirit Storyteller AIによって生成されました。`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
         // Fallback for desktop
        await navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}`);
        alert('物語をクリップボードにコピーしました！');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      alert('物語を共有できませんでした。');
    }
  };

  return (
    <div className="animate-fade-in bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-spooky-purple/30 shadow-2xl shadow-spooky-purple/10 max-w-2xl w-full">
      <h2 className="font-creepster text-4xl md:text-6xl text-spooky-orange text-glow text-center mb-4">
        {story.title}
      </h2>
      <p className="text-gray-300 whitespace-pre-wrap leading-relaxed h-64 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
        {displayedContent}
        <span className="inline-block w-2 h-5 bg-gray-300 ml-1 animate-ping" />
      </p>
      <div className="mt-8 flex justify-center items-center gap-4">
        <IconButton onClick={onReset} aria-label="Generate new story">
          <RedoIcon />
          <span>新しい物語</span>
        </IconButton>
        <IconButton onClick={handleShare} aria-label="Share story">
          <ShareIcon />
          <span>共有</span>
        </IconButton>
      </div>
    </div>
  );
};

export default StoryDisplay;
