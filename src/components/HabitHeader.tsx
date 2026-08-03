import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, PenLine, Check } from 'lucide-react';
import { sanitizeHabitName } from '../utils/safeStorage';

const MAX_NAME_LENGTH = 80;

interface HabitHeaderProps {
  isEditingName: boolean;
  habitName: string;
  setHabitName: (name: string) => void;
  setIsEditingName: (isEditing: boolean) => void;
  streak: number;
}

export function HabitHeader({ isEditingName, habitName, setHabitName, setIsEditingName, streak }: HabitHeaderProps) {
  const previousNameRef = useRef(habitName);

  const startEditing = () => {
    previousNameRef.current = habitName;
    setIsEditingName(true);
  };

  const commitEdit = () => {
    const cleaned = sanitizeHabitName(habitName);
    setHabitName(cleaned);
    setIsEditingName(false);
  };

  const cancelEdit = () => {
    setHabitName(previousNameRef.current);
    setIsEditingName(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 text-ink-500/80">
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
                  onChange={(e) => setHabitName(e.target.value.slice(0, MAX_NAME_LENGTH))}
                  maxLength={MAX_NAME_LENGTH}
                  aria-label="Habit name"
                  className="text-4xl md:text-5xl font-serif text-ink-900 bg-transparent border-b-2 border-ink-900 focus:outline-none w-full pb-1 min-w-0"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitEdit();
                    if (e.key === 'Escape') cancelEdit();
                  }}
                  onBlur={commitEdit}
                />
                <button
                  onClick={commitEdit}
                  className="p-2 bg-ink-900 text-linen-50 rounded-full hover:bg-ink-700 transition-colors shrink-0"
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
                className="flex items-center gap-4 group min-w-0"
              >
                <h1 className="text-4xl md:text-5xl font-serif text-ink-900 tracking-tight truncate">
                  {habitName}
                </h1>
                <button
                  onClick={startEditing}
                  className="p-2 text-ink-500 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity hover:text-ink-900 hover:bg-linen-200 rounded-full shrink-0"
                  aria-label="Edit habit name"
                >
                  <PenLine className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-end gap-4 bg-linen-50 px-6 py-4 rounded-3xl border border-linen-200 shadow-sm shadow-ink-900/5">
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold text-ink-500 uppercase tracking-widest mb-1">Current Streak</span>
          <div className="flex items-baseline gap-1">
            <motion.span
              key={streak}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl font-serif text-ink-900 leading-none"
            >
              {streak}
            </motion.span>
            <span className="text-sm font-medium text-ink-500">{streak === 1 ? 'day' : 'days'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
