
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 text-spooky-orange border border-spooky-orange/50 rounded-lg backdrop-blur-sm hover:bg-spooky-orange/20 hover:text-orange-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-spooky-orange focus:ring-offset-2 focus:ring-offset-deep-black"
    >
      {children}
    </button>
  );
};

export default IconButton;
   