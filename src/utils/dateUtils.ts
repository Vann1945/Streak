/** Returns a local (not UTC) date key in YYYY-MM-DD form, offset by N days from today. */
export const getLocalYYYYMMDD = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/** Human-friendly weekday label, e.g. "Mon". */
export const getWeekdayLabel = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString('en-US', { weekday: 'short' });
};

/** Converts a Date to a local YYYY-MM-DD key (no offset-from-today involved). */
const toLocalKey = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export interface CalendarDay {
  dateStr: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isFuture: boolean;
}

/**
 * Builds a full 7-column calendar grid (Mon-start) for the month containing
 * `reference`, padded with the trailing days of the previous month and the
 * leading days of the next month so every week row has 7 cells.
 */
export function getMonthGrid(reference: Date = new Date()): CalendarDay[] {
  const year = reference.getFullYear();
  const month = reference.getMonth();
  const todayStr = toLocalKey(new Date());

  const firstOfMonth = new Date(year, month, 1);
  // JS getDay(): 0=Sun..6=Sat. Convert to Mon-start index (0=Mon..6=Sun).
  const firstWeekdayMonStart = (firstOfMonth.getDay() + 6) % 7;

  const gridStart = new Date(year, month, 1 - firstWeekdayMonStart);

  const days: CalendarDay[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    const dateStr = toLocalKey(d);
    days.push({
      dateStr,
      dayOfMonth: d.getDate(),
      isCurrentMonth: d.getMonth() === month,
      isToday: dateStr === todayStr,
      isFuture: dateStr > todayStr,
    });
    // Stop once we've completed the row containing the month's last day
    // and it's a full week, avoiding a trailing all-next-month row.
    if (i >= 34 && d.getMonth() !== month && (i + 1) % 7 === 0) break;
  }
  return days;
}

export const MONTH_LABEL = (reference: Date = new Date()) =>
  reference.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
