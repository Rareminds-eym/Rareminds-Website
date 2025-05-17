import React, { ReactNode } from 'react';
import { cn } from '../../../../lib/utils';

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  delay?: number;
}

const ActionButton = ({ icon, label, onClick, delay = 0 }: ActionButtonProps) => {
  return (
    <div className="flex items-center gap-3 group animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <div className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm">
        {label}
      </div>
      <button
        onClick={onClick}
        aria-label={label}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          "bg-gradient-to-r from-indigo-500/90 to-purple-500/90 backdrop-blur-sm",
          "text-white shadow-md",
          "transform transition-all duration-200",
          "hover:scale-110 hover:shadow-lg",
          "focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
        )}
      >
        {icon}
      </button>
    </div>
  );
};

export default ActionButton;
