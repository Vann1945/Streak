import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ResetModal({ isOpen, onConfirm, onCancel }: ResetModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#F5F3EC]/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            className="bg-white rounded-3xl p-10 max-w-sm w-full shadow-2xl flex flex-col items-center text-center border border-zinc-200"
          >
            <div className="w-12 h-12 bg-zinc-100 text-zinc-900 rounded-full flex items-center justify-center mb-6">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-serif mb-3 text-zinc-900 tracking-tight">Begin Anew?</h2>
            <p className="text-sm text-zinc-500 mb-8 leading-relaxed font-medium">
              Your streak will return to zero and all historical data will be cleared permanently.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button 
                onClick={onConfirm}
                className="w-full py-3.5 bg-zinc-900 text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-colors"
              >
                Yes, Reset
              </button>
              <button 
                onClick={onCancel}
                className="w-full py-3.5 bg-transparent text-zinc-500 text-xs font-semibold uppercase tracking-widest rounded-full hover:text-zinc-900 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
