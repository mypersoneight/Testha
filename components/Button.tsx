import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  isActive?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  isActive = false,
  icon,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden group w-full px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: `bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 focus:ring-indigo-500 ${isActive ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`,
    secondary: `bg-white text-slate-700 border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 focus:ring-slate-400 ${isActive ? 'bg-slate-50 border-slate-300 ring-2 ring-offset-2 ring-slate-200' : ''}`,
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${isLoading ? 'cursor-not-allowed opacity-90' : ''} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-inherit z-10 flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
      )}
      
      {/* Content */}
      <span className={`flex items-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {icon}
        {children}
      </span>
    </button>
  );
};