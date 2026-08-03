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
