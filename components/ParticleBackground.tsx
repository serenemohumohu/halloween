
import React, { useMemo } from 'react';

const ParticleBackground: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const animationDuration = Math.random() * 20 + 10;
      const animationDelay = Math.random() * -20;
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const opacity = Math.random() * 0.3 + 0.1;

      return (
        <div
          key={i}
          className="absolute rounded-full bg-spooky-purple/50 animate-float"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top,
            left,
            opacity,
            animationDuration: `${animationDuration}s`,
            animationDelay: `${animationDelay}s`,
          }}
        />
      );
    });
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {particles}
    </div>
  );
};

export default ParticleBackground;
   