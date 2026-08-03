import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Activity, PieChart } from 'lucide-react';
import { ProgressRing } from './ProgressRing';
import { getLocalYYYYMMDD } from '../utils/dateUtils';

interface MonthlyOverviewProps {
  activityLog: Record<string, 'active' | 'rest'>;
}

export function MonthlyOverview({ activityLog }: MonthlyOverviewProps) {
  // Compute monthly stats
  const todayDateStr = getLocalYYYYMMDD();
  const currentMonthPrefix = todayDateStr.substring(0, 7);
  
  let activeDaysThisMonth = 0;
  let restDaysThisMonth = 0;
  let totalLoggedDaysThisMonth = 0;

  Object.entries(activityLog).forEach(([dateStr, status]) => {
    if (dateStr.startsWith(currentMonthPrefix)) {
      totalLoggedDaysThisMonth++;
      if (status === 'active') activeDaysThisMonth++;
      else if (status === 'rest') restDaysThisMonth++;
    }
  });

  const progressPercentage = totalLoggedDaysThisMonth === 0 
    ? 0 
    : Math.round((activeDaysThisMonth / totalLoggedDaysThisMonth) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-3xl p-8 mb-8 border border-zinc-200 shadow-sm relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <PieChart className="w-48 h-48" />
      </div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <Calendar className="w-5 h-5 text-zinc-900" />
        <h2 className="text-xl font-serif text-zinc-900">Monthly Overview</h2>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
        <div className="relative">
          <ProgressRing 
            radius={70} 
            stroke={10} 
            progress={progressPercentage} 
            activeColor="#18181b" 
            inactiveColor="#f4f4f5"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-serif text-zinc-900 leading-none">{progressPercentage}%</span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-500 mt-1">Active</span>
          </div>
        </div>

        <div className="flex flex-col gap-5 flex-1 w-full">
          <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-zinc-900"></div>
              <span className="text-sm font-medium text-zinc-700">Active Days</span>
            </div>
            <span className="text-xl font-serif text-zinc-900">{activeDaysThisMonth}</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-zinc-300"></div>
              <span className="text-sm font-medium text-zinc-700">Rest Days</span>
            </div>
            <span className="text-xl font-serif text-zinc-500">{restDaysThisMonth}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
