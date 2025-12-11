import React, { useState } from 'react';
import { Button } from './components/Button';
import { MessageCard } from './components/MessageCard';
import { SparklesIcon, ChatBubbleIcon } from './components/Icons';
import { generateInspirationalMessage } from './services/geminiService';

export default function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'simple' | 'ai' | null>(null);

  const handleSimpleClick = () => {
    setLoading(false);
    setError(null);
    setMode('simple');
    setMessage("Hello! Sometimes the simplest things bring the most joy. Have a wonderful day!");
  };

  const handleAIClick = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    setMode('ai');
    setMessage(null);
    
    try {
      const aiMessage = await generateInspirationalMessage();
      setMessage(aiMessage);
    } catch (err) {
      console.error(err);
      setError("The stars are cloudy right now. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-purple-100 flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-500">
      <div className="max-w-md w-full bg-white/70 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 p-8 space-y-8 relative overflow-hidden">
        
        {/* Decorative background element */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center space-y-3 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-indigo-900">
            Reveal a Message
          </h1>
          <p className="text-slate-500 font-medium">
            Choose how you want to be inspired today.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 relative z-10">
          <Button
            onClick={handleSimpleClick}
            variant="secondary"
            icon={<ChatBubbleIcon />}
            isActive={mode === 'simple'}
          >
            Simple Hello
          </Button>
          <Button
            onClick={handleAIClick}
            variant="primary"
            isLoading={loading}
            icon={<SparklesIcon />}
            isActive={mode === 'ai'}
          >
            Gemini Wisdom
          </Button>
        </div>

        <div className="min-h-[140px] flex items-center justify-center relative z-10">
            {error && (
              <div className="text-center fade-in">
                <p className="text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-lg border border-red-100">
                  {error}
                </p>
              </div>
            )}
            
            {message && !loading && (
              <MessageCard content={message} type={mode === 'ai' ? 'special' : 'standard'} />
            )}
            
            {loading && (
                 <div className="flex flex-col items-center gap-3 text-indigo-600 fade-in">
                    <div className="w-8 h-8 border-3 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></div>
                    <span className="text-xs font-semibold uppercase tracking-widest opacity-70">Consulting the AI...</span>
                 </div>
            )}
            
            {!message && !loading && !error && (
                <div className="text-center text-slate-400 opacity-60 flex flex-col items-center gap-2">
                  <div className="w-12 h-1 bg-slate-200 rounded-full"></div>
                  <p className="text-sm italic">Your message will appear here</p>
                </div>
            )}
        </div>

        <div className="text-center pt-2 border-t border-slate-100 relative z-10">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">
            Powered by React & Gemini
          </p>
        </div>
      </div>
    </div>
  );
}