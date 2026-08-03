import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ResetModal({ isOpen, onConfirm, onCancel }: ResetModalProps) {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    confirmButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-linen-100/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-modal-title"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
            className="bg-linen-50 rounded-3xl p-10 max-w-sm w-full shadow-2xl flex flex-col items-center text-center border border-linen-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-linen-200 text-ink-900 rounded-full flex items-center justify-center mb-6">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h2 id="reset-modal-title" className="text-xl font-serif mb-3 text-ink-900 tracking-tight">
              Begin Anew?
            </h2>
            <p className="text-sm text-ink-500 mb-8 leading-relaxed font-medium">
              Your streak will return to zero and all historical data will be cleared permanently.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button
                ref={confirmButtonRef}
                onClick={onConfirm}
                className="w-full py-3.5 bg-ink-900 text-linen-50 text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-ink-700 transition-colors"
              >
                Yes, Reset
              </button>
              <button
                onClick={onCancel}
                className="w-full py-3.5 bg-transparent text-ink-500 text-xs font-semibold uppercase tracking-widest rounded-full hover:text-ink-900 transition-colors"
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
