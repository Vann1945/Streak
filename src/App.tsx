import React, { useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { getLocalYYYYMMDD } from './utils/dateUtils';
import { HabitHeader } from './components/HabitHeader';
import { ActivityLogView } from './components/ActivityLogView';
import { MonthlyOverview } from './components/MonthlyOverview';
import { MainActionControls } from './components/MainActionControls';
import { ResetModal } from './components/ResetModal';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, RotateCcw } from 'lucide-react';

function App() {
  const [habitName, setHabitName] = useState(() => {
    return localStorage.getItem('habitName') || 'Morning Meditation';
  });
  const [isEditingName, setIsEditingName] = useState(false);
  
  const [activityLog, setActivityLog] = useState<Record<string, 'active' | 'rest'>>(() => {
    const saved = localStorage.getItem('activityLog');
    return saved ? JSON.parse(saved) : {};
  });

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('habitName', habitName);
  }, [habitName]);

  useEffect(() => {
    localStorage.setItem('activityLog', JSON.stringify(activityLog));
  }, [activityLog]);

  const todayDateStr = useMemo(() => getLocalYYYYMMDD(), []);
  const yesterdayDateStr = useMemo(() => getLocalYYYYMMDD(-1), []);
  
  const calculateStreak = useCallback(() => {
    let currentStreak = 0;
    let offset = 0;
    
    const todayStatus = activityLog[todayDateStr];
    
    // If today is not active, check if it's rest or not recorded. 
    // If not recorded, we start counting from yesterday.
    if (!todayStatus) {
      offset = -1;
    }
    
    while (true) {
      const dateStr = getLocalYYYYMMDD(offset);
      const status = activityLog[dateStr];
      
      if (status === 'active') {
        currentStreak++;
        offset--;
      } else if (status === 'rest') {
        // Rest days don't break the streak, but don't add to it either
        offset--;
      } else {
        // No log found, streak broken
        break;
      }
    }
    return currentStreak;
  }, [activityLog, todayDateStr]);

  const streak = useMemo(() => calculateStreak(), [calculateStreak]);
  const statusToday = activityLog[todayDateStr] || null;

  // Streak is considered broken if yesterday AND today are not logged
  // (unless it's just the very beginning and no streak exists)
  const isBroken = !statusToday && !activityLog[yesterdayDateStr] && Object.keys(activityLog).length > 0;
  const displayStreak = isBroken ? 0 : streak;

  const handleRecordStatus = (status: 'active' | 'rest') => {
    setActivityLog(prev => ({
      ...prev,
      [todayDateStr]: status
    }));

    if (status === 'active') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4A3B32', '#7A6B5D', '#9C8B7D', '#E5E0D8']
      });
    }
  };

  const handleReset = () => {
    setActivityLog({});
    setIsResetModalOpen(false);
  };

  return (
    <main className="min-h-dvh bg-[#fdfdfc] text-zinc-900 font-sans flex flex-col items-center py-12 px-6 sm:px-12 selection:bg-zinc-200">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl flex flex-col gap-16"
      >
        <header className="flex justify-between items-center pb-6 border-b border-zinc-200">
          <div className="flex items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900">
              Voltra
            </h1>
          </div>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-zinc-500">
            Daily Focus
          </span>
        </header>

        <HabitHeader 
          isEditingName={isEditingName}
          habitName={habitName}
          setHabitName={setHabitName}
          setIsEditingName={setIsEditingName}
          streak={displayStreak}
        />

        <article className="flex flex-col items-center text-center relative -mt-6">
          <MainActionControls 
            statusToday={statusToday} 
            onRecordStatus={handleRecordStatus} 
          />

          <AnimatePresence>
            {isBroken && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-12 text-xs font-medium tracking-wide flex items-center justify-center gap-2 text-zinc-500"
              >
                <Activity className="w-4 h-4 opacity-70" />
                <span>Streak broken. A new beginning awaits.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </article>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-zinc-200">
          <ActivityLogView activityLog={activityLog} />
          <MonthlyOverview activityLog={activityLog} />
        </div>

        {/* Footer */}
        <div className="flex justify-center pb-12 pt-8">
          <button 
            onClick={() => setIsResetModalOpen(true)}
            className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Journey
          </button>
        </div>
      </motion.div>

      <ResetModal 
        isOpen={isResetModalOpen}
        onConfirm={handleReset}
        onCancel={() => setIsResetModalOpen(false)}
      />
    </main>
  );
}

export default App;
