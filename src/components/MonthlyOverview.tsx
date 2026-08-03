import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Calendar, PieChart } from 'lucide-react';
import { ProgressRing } from './ProgressRing';
import { getLocalYYYYMMDD } from '../utils/dateUtils';
import type { ActivityLog } from '../utils/safeStorage';

interface MonthlyOverviewProps {
  activityLog: ActivityLog;
}

export function MonthlyOverview({ activityLog }: MonthlyOverviewProps) {
  const { activeDaysThisMonth, restDaysThisMonth, progressPercentage } = useMemo(() => {
    const todayDateStr = getLocalYYYYMMDD();
    const currentMonthPrefix = todayDateStr.substring(0, 7);

    let active = 0;
    let rest = 0;
    let total = 0;

    for (const [dateStr, status] of Object.entries(activityLog)) {
      if (dateStr.startsWith(currentMonthPrefix)) {
        total++;
        if (status === 'active') active++;
        else if (status === 'rest') rest++;
      }
    }

    const percentage = total === 0 ? 0 : Math.round((active / total) * 100);
    return { activeDaysThisMonth: active, restDaysThisMonth: rest, progressPercentage: percentage };
  }, [activityLog]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-linen-50 rounded-3xl p-8 mb-8 border border-linen-200 shadow-sm relative overflow-hidden"
    >
      <div aria-hidden="true" className="absolute top-0 right-0 p-8 opacity-[0.04] text-ink-900">
        <PieChart className="w-48 h-48" />
      </div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <Calendar className="w-5 h-5 text-ink-900" />
        <h2 className="text-xl font-serif text-ink-900">Monthly Overview</h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
        <div className="relative shrink-0">
          <ProgressRing radius={70} stroke={10} progress={progressPercentage} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-serif text-ink-900 leading-none">{progressPercentage}%</span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-ink-500 mt-1">Active</span>
          </div>
        </div>

        <div className="flex flex-col gap-5 flex-1 w-full">
          <div className="flex items-center justify-between p-4 bg-linen-100 rounded-2xl border border-linen-200/70">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-ember-500" />
              <span className="text-sm font-medium text-ink-700">Active Days</span>
            </div>
            <span className="text-xl font-serif text-ink-900">{activeDaysThisMonth}</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-linen-100 rounded-2xl border border-linen-200/70">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-ink-500/40" />
              <span className="text-sm font-medium text-ink-700">Rest Days</span>
            </div>
            <span className="text-xl font-serif text-ink-500">{restDaysThisMonth}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
