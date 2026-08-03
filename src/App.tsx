import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getLocalYYYYMMDD } from './utils/dateUtils';
import { readActivityLog, sanitizeHabitName, safeGetItem, safeSetItem, type ActivityLog } from './utils/safeStorage';
import { HabitHeader } from './components/HabitHeader';
import { ActivityLogView } from './components/ActivityLogView';
import { MonthlyOverview } from './components/MonthlyOverview';
import { MainActionControls } from './components/MainActionControls';
import { ResetModal } from './components/ResetModal';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, RotateCcw } from 'lucide-react';

const CONFETTI_COLORS = ['#2A2420', '#4A3F37', '#C08A4E', '#EAE6DB'];

function App() {
  const [habitName, setHabitName] = useState(() => sanitizeHabitName(safeGetItem('habitName')));
  const [isEditingName, setIsEditingName] = useState(false);

  const [activityLog, setActivityLog] = useState<ActivityLog>(() => readActivityLog(safeGetItem('activityLog')));

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => {
    safeSetItem('habitName', habitName);
  }, [habitName]);

  useEffect(() => {
    safeSetItem('activityLog', JSON.stringify(activityLog));
  }, [activityLog]);

  const todayDateStr = useMemo(() => getLocalYYYYMMDD(), []);
  const yesterdayDateStr = useMemo(() => getLocalYYYYMMDD(-1), []);

  const streak = useMemo(() => {
    let currentStreak = 0;
    let offset = activityLog[todayDateStr] ? 0 : -1;

    // Bound the loop defensively — a log can never meaningfully exceed the
    // number of days the app could have been used, so this guards against
    // any unforeseen infinite-loop condition from malformed data.
    for (let steps = 0; steps < 20_000; steps++) {
      const dateStr = getLocalYYYYMMDD(offset);
      const status = activityLog[dateStr];

      if (status === 'active') {
        currentStreak++;
        offset--;
      } else if (status === 'rest') {
        offset--;
      } else {
        break;
      }
    }
    return currentStreak;
  }, [activityLog, todayDateStr]);

  const statusToday = activityLog[todayDateStr] ?? null;

  // Streak is considered broken if yesterday AND today are not logged
  // (unless it's just the very beginning and no streak exists)
  const isBroken = !statusToday && !activityLog[yesterdayDateStr] && Object.keys(activityLog).length > 0;
  const displayStreak = isBroken ? 0 : streak;

  const handleRecordStatus = useCallback((status: 'active' | 'rest') => {
    setActivityLog((prev) => ({
      ...prev,
      [todayDateStr]: status,
    }));

    if (status === 'active') {
      // Lazy-load confetti only when actually needed, keeping it out of the
      // initial bundle for a faster first paint.
      import('canvas-confetti').then(({ default: confetti }) => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: CONFETTI_COLORS,
        });
      });
    }
  }, [todayDateStr]);

  const handleReset = useCallback(() => {
    setActivityLog({});
    setIsResetModalOpen(false);
  }, []);

  return (
    <main className="min-h-dvh bg-linen-100 text-ink-900 font-sans flex flex-col items-center py-12 px-6 sm:px-12 selection:bg-ember-500/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl flex flex-col gap-16"
      >
        <header className="flex justify-between items-center pb-6 border-b border-linen-200">
          <div className="flex items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink-900">Voltra</h1>
          </div>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-ink-500">Daily Focus</span>
        </header>

        <HabitHeader
          isEditingName={isEditingName}
          habitName={habitName}
          setHabitName={setHabitName}
          setIsEditingName={setIsEditingName}
          streak={displayStreak}
        />

        <article className="flex flex-col items-center text-center relative -mt-6">
          <MainActionControls statusToday={statusToday} onRecordStatus={handleRecordStatus} />

          <AnimatePresence>
            {isBroken && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-12 text-xs font-medium tracking-wide flex items-center justify-center gap-2 text-ink-500"
              >
                <Activity className="w-4 h-4 opacity-70" />
                <span>Streak broken. A new beginning awaits.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </article>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-linen-200">
          <ActivityLogView activityLog={activityLog} />
          <MonthlyOverview activityLog={activityLog} />
        </div>

        <div className="flex justify-center pb-12 pt-8">
          <button
            onClick={() => setIsResetModalOpen(true)}
            className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-500/70 hover:text-ink-900 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Journey
          </button>
        </div>
      </motion.div>

      <ResetModal isOpen={isResetModalOpen} onConfirm={handleReset} onCancel={() => setIsResetModalOpen(false)} />
    </main>
  );
}

export default App;
