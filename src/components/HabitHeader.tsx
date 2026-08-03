import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, PenLine, Check } from 'lucide-react';

interface HabitHeaderProps {
  isEditingName: boolean;
  habitName: string;
  setHabitName: (name: string) => void;
  setIsEditingName: (isEditing: boolean) => void;
  streak: number;
}

export function HabitHeader({ isEditingName, habitName, setHabitName, setIsEditingName, streak }: HabitHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2 text-zinc-500">
          <Target className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">Current Focus</span>
        </div>
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {isEditingName ? (
              <motion.div
                key="edit"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-2 flex-1 max-w-sm"
              >
                <input
                  type="text"
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  className="text-4xl md:text-5xl font-serif text-zinc-900 bg-transparent border-b-2 border-zinc-900 focus:outline-none w-full pb-1"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setIsEditingName(false);
                  }}
                />
                <button 
                  onClick={() => setIsEditingName(false)}
                  className="p-2 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-colors"
                  aria-label="Save habit name"
                >
                  <Check className="w-5 h-5" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="view"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-4 group"
              >
                <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 tracking-tight">{habitName}</h1>
                <button 
                  onClick={() => setIsEditingName(true)}
                  className="p-2 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-zinc-900 hover:bg-zinc-100 rounded-full"
                  aria-label="Edit habit name"
                >
                  <PenLine className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex items-end gap-4 bg-white px-6 py-4 rounded-3xl border border-zinc-200 shadow-sm">
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">Current Streak</span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-serif text-zinc-900 leading-none">{streak}</span>
            <span className="text-sm font-medium text-zinc-500">days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
