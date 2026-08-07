/**
 * Safe localStorage helpers.
 *
 * Data in localStorage is not trustworthy: it can be edited manually via
 * devtools, corrupted by a previous app version, or (in the event some other
 * script on the origin is compromised) tampered with. Every read is
 * validated before it touches React state so a bad value can only ever
 * result in a safe fallback, never a crash or unbounded memory growth.
 */

export type ActivityStatus = 'active' | 'rest';
export type ActivityLog = Record<string, ActivityStatus>;

const DATE_KEY_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_LOG_ENTRIES = 20_000; // ~54 years of daily entries; generous but bounded
const MAX_HABIT_NAME_LENGTH = 80;

function isValidDateKey(key: string): boolean {
  if (!DATE_KEY_RE.test(key)) return false;
  const time = new Date(key + 'T00:00:00').getTime();
  return Number.isFinite(time);
}

function isValidStatus(value: unknown): value is ActivityStatus {
  return value === 'active' || value === 'rest';
}

/** Parses and validates the activity log, dropping anything malformed. */
export function readActivityLog(raw: string | null): ActivityLog {
  if (!raw) return {};

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return {};
  }

  const result: ActivityLog = {};
  let count = 0;
  for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
    if (count >= MAX_LOG_ENTRIES) break;
    if (isValidDateKey(key) && isValidStatus(value)) {
      result[key] = value;
      count++;
    }
  }
  return result;
}

/** Sanitizes a user-editable habit name: trims, strips control chars, caps length. */
export function sanitizeHabitName(raw: string | null): string {
  const fallback = 'Morning Meditation';
  if (!raw) return fallback;
  // Strip control characters and trim; cap length to prevent layout abuse
  // eslint-disable-next-line no-control-regex
  const cleaned = raw.replace(/[\u0000-\u001F\u007F]/g, '').trim();
  if (!cleaned) return fallback;
  return cleaned.slice(0, MAX_HABIT_NAME_LENGTH);
}

/** Wraps localStorage.setItem so a full/blocked storage quota never throws uncaught. */
export function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    // Storage may be full, disabled (private browsing), or blocked by policy.
    // Fail silently from the caller's perspective; the UI still works for
    // the current session, it just won't persist.
    return false;
  }
}

export function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
