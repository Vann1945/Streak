import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MainActionControlsProps {
  statusToday: 'active' | 'rest' | null;
  onRecordStatus: (status: 'active' | 'rest') => void;
}

export function MainActionControls({ statusToday, onRecordStatus }: MainActionControlsProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <AnimatePresence mode="popLayout">
        {statusToday === null ? (
          <motion.div
            key="actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <button
              onClick={() => onRecordStatus('active')}
              className="group relative overflow-hidden bg-ink-900 text-linen-50 p-8 rounded-3xl text-left transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-ink-900/20"
            >
              <div
                aria-hidden="true"
                className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-ember-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-linen-100/50">Complete</span>
                <div className="flex items-end justify-between gap-4">
                  <span className="text-2xl font-serif">I did it today</span>
                  <div className="w-10 h-10 shrink-0 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-ember-500/30 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => onRecordStatus('rest')}
              className="group relative overflow-hidden bg-linen-50 text-ink-900 p-8 rounded-3xl text-left transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] border border-linen-200 shadow-sm"
            >
              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-500">Rest</span>
                <div className="flex items-end justify-between gap-4">
                  <span className="text-2xl font-serif">Taking a break</span>
                  <div className="w-10 h-10 shrink-0 rounded-full bg-linen-200 flex items-center justify-center group-hover:bg-linen-200/70 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`p-8 rounded-3xl border text-center flex flex-col items-center justify-center gap-4 ${
              statusToday === 'active'
                ? 'bg-ink-900 text-linen-50 border-ink-700 shadow-lg shadow-ink-900/20'
                : 'bg-linen-50 text-ink-900 border-linen-200 shadow-sm'
            }`}
          >
            <div
              className={`text-[10px] font-semibold uppercase tracking-widest ${
                statusToday === 'active' ? 'text-linen-100/50' : 'text-ink-500'
              }`}
            >
              Today's Status
            </div>
            <div className="text-3xl font-serif">
              {statusToday === 'active' ? 'You conquered today.' : 'Resting and recovering.'}
            </div>
            <p className={`text-sm font-medium ${statusToday === 'active' ? 'text-linen-100/50' : 'text-ink-500'}`}>
              See you tomorrow for the next step in your journey.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
