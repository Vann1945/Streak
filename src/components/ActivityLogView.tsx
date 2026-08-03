import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';
import { getLocalYYYYMMDD, getWeekdayLabel } from '../utils/dateUtils';
import type { ActivityLog } from '../utils/safeStorage';

interface ActivityLogViewProps {
  activityLog: ActivityLog;
}

export function ActivityLogView({ activityLog }: ActivityLogViewProps) {
  const last7Days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const offset = -i;
      const dateStr = getLocalYYYYMMDD(offset);
      const d = new Date();
      d.setDate(d.getDate() + offset);
      return {
        dateStr,
        displayDay: getWeekdayLabel(offset),
        displayDate: d.getDate(),
        status: activityLog[dateStr],
      };
    }).reverse();
  }, [activityLog]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-linen-50 rounded-3xl p-8 mb-8 border border-linen-200 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-5 h-5 text-ink-900" />
        <h2 className="text-xl font-serif text-ink-900">Recent Activity</h2>
      </div>
      <div className="flex justify-between items-end gap-2">
        {last7Days.map((day, i) => (
          <div key={day.dateStr} className="flex flex-col items-center gap-3 flex-1">
            <div className="text-[10px] font-semibold text-ink-500 uppercase tracking-widest">{day.displayDay}</div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05 * i, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full aspect-4/5 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                day.status === 'active'
                  ? 'bg-ink-900 text-linen-50 shadow-md shadow-ink-900/20'
                  : day.status === 'rest'
                    ? 'bg-linen-200 text-ink-500'
                    : 'bg-linen-50 border-2 border-dashed border-linen-200 text-ink-500'
              }`}
            >
              <span className="font-serif text-lg">{day.displayDate}</span>
            </motion.div>
            {i === last7Days.length - 1 && <div className="w-1 h-1 rounded-full bg-ember-500 mt-1" />}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
