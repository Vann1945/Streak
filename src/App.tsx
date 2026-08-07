import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { getLocalYYYYMMDD } from './utils/dateUtils';
import { readActivityLog, sanitizeHabitName, safeGetItem, safeSetItem, type ActivityLog } from './utils/safeStorage';
import { HabitHeader } from './components/HabitHeader';
import { ActivityLogView } from './components/ActivityLogView';
import { MonthCalendar } from './components/MonthCalendar';
import { MonthlyOverview } from './components/MonthlyOverview';
import { MainActionControls } from './components/MainActionControls';
import { LazyMotion, domAnimation, MotionConfig, AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { Activity, RotateCcw } from 'lucide-react';

// ResetModal is never visible on initial load — it only mounts after the
// user deliberately clicks "Reset Journey" — so it's split out of the main
// bundle the same way canvas-confetti already is below. Suspense fallback
// is null because the modal itself renders nothing until isOpen is true;
// the brief import delay on first click is imperceptible (a few KB over an
// already-warm connection) and avoids shipping modal code every visit.
const ResetModal = lazy(() => import('./components/ResetModal').then((m) => ({ default: m.ResetModal })));

const CONFETTI_COLORS = ['#141413', '#3a3934', '#c96442', '#f0eee6'];

function App() {
  const [habitName, setHabitName] = useState(() => sanitizeHabitName(safeGetItem('habitName')));
  const [isEditingName, setIsEditingName] = useState(false);

  const [activityLog, setActivityLog] = useState<ActivityLog>(() => readActivityLog(safeGetItem('activityLog')));
  const [journeyStartDate, setJourneyStartDate] = useState<string | null>(() => {
    const stored = safeGetItem('journeyStartDate');
    return stored && /^\d{4}-\d{2}-\d{2}$/.test(stored) ? stored : null;
  });

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => {
    safeSetItem('habitName', habitName);
  }, [habitName]);

  useEffect(() => {
    safeSetItem('activityLog', JSON.stringify(activityLog));
  }, [activityLog]);

  useEffect(() => {
    safeSetItem('journeyStartDate', journeyStartDate ?? '');
  }, [journeyStartDate]);

  const todayDateStr = useMemo(() => getLocalYYYYMMDD(), []);
  const yesterdayDateStr = useMemo(() => getLocalYYYYMMDD(-1), []);
  const todayLabel = useMemo(
    () => new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
    [],
  );

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
    // The first button click defines the beginning of this tracking period.
    setJourneyStartDate((prev) => prev ?? todayDateStr);
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
    setJourneyStartDate(null);
    setIsResetModalOpen(false);
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <main className="min-h-dvh bg-linen-100 text-ink-900 font-sans flex flex-col items-center py-8 sm:py-12 px-5 sm:px-12 selection:bg-ember-500/30">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl flex flex-col gap-10 sm:gap-14"
          >
            <header className="flex justify-between items-center pb-5 border-b border-linen-200">
              <div className="flex items-center gap-4">
                <p className="text-xl sm:text-2xl font-semibold tracking-tight text-ink-900">Voltra</p>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-ink-500">Daily Focus</span>
                <time dateTime={todayDateStr} className="text-[11px] font-medium text-ink-700">
                  {todayLabel}
                </time>
              </div>
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
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-12 text-xs font-medium tracking-wide flex items-center justify-center gap-2 text-ink-500"
                  >
                    <Activity className="w-4 h-4 opacity-70" aria-hidden="true" />
                    <span>Streak broken. A new beginning awaits.</span>
                  </m.div>
                )}
              </AnimatePresence>
            </article>

            <div className="w-full flex flex-col gap-5 sm:gap-6 pt-8 sm:pt-10 border-t border-linen-200">
              <MonthCalendar activityLog={activityLog} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <ActivityLogView activityLog={activityLog} />
                <MonthlyOverview activityLog={activityLog} journeyStartDate={journeyStartDate} />
              </div>
            </div>

            <div className="flex justify-center pb-12 pt-8">
              <button
                onClick={() => setIsResetModalOpen(true)}
                className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-ink-500 hover:text-ink-900 transition-colors"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                Reset Journey
              </button>
            </div>
          </m.div>

          <Suspense fallback={null}>
            <ResetModal isOpen={isResetModalOpen} onConfirm={handleReset} onCancel={() => setIsResetModalOpen(false)} />
          </Suspense>
        </main>
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
