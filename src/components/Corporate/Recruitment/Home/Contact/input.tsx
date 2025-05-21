import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        className={`px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-corporate-black/20 transition-all ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';