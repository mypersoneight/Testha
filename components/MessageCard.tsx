import React from 'react';

interface MessageCardProps {
  content: string;
  type?: 'standard' | 'special';
}

export const MessageCard: React.FC<MessageCardProps> = ({ content, type = 'standard' }) => {
  return (
    <div className="w-full fade-in">
      <div className={`
        relative p-6 rounded-2xl text-center
        ${type === 'special' 
          ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/50' 
          : 'bg-slate-50 border border-slate-100'}
      `}>
        {type === 'special' && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
             <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
               AI Generated
             </span>
          </div>
        )}
        
        <p className={`
          leading-relaxed
          ${type === 'special' ? 'text-lg font-medium text-slate-800' : 'text-base text-slate-700'}
        `}>
          "{content}"
        </p>
      </div>
    </div>
  );
};