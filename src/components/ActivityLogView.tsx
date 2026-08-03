import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity } from 'lucide-react';
import { getLocalYYYYMMDD } from '../utils/dateUtils';

interface ActivityLogViewProps {
  activityLog: Record<string, 'active' | 'rest'>;
}

export function ActivityLogView({ activityLog }: ActivityLogViewProps) {
  // Get last 7 days including today
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const offset = -i;
    const dateStr = getLocalYYYYMMDD(offset);
    const d = new Date();
    d.setDate(d.getDate() + offset);
    const displayDay = d.toLocaleDateString('en-US', { weekday: 'short' });
    const displayDate = d.getDate();
    return { dateStr, displayDay, displayDate, status: activityLog[dateStr] };
  }).reverse();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-3xl p-8 mb-8 border border-zinc-200 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-5 h-5 text-zinc-900" />
        <h2 className="text-xl font-serif text-zinc-900">Recent Activity</h2>
      </div>
      <div className="flex justify-between items-end gap-2">
        {last7Days.map((day, i) => (
          <div key={day.dateStr} className="flex flex-col items-center gap-3 flex-1">
            <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">{day.displayDay}</div>
            <div className={`w-full aspect-[4/5] rounded-xl flex items-center justify-center transition-all duration-300 ${
              day.status === 'active' 
                ? 'bg-zinc-900 text-white shadow-md shadow-zinc-900/20' 
                : day.status === 'rest' 
                  ? 'bg-zinc-100 text-zinc-400' 
                  : 'bg-white border-2 border-dashed border-zinc-200 text-zinc-300'
            }`}>
              <span className="font-serif text-lg">{day.displayDate}</span>
            </div>
            {i === last7Days.length - 1 && (
              <div className="w-1 h-1 rounded-full bg-zinc-900 mt-1"></div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
