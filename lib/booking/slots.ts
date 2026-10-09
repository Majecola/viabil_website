/**
 * Presentation availability.
 *
 * For now this generates EXAMPLE availability: business days, fixed daily
 * slots in Brasília time, with a deterministic share of them marked busy so
 * the calendar looks like a real agenda. The next step is to replace
 * `getAvailability` with a free/busy lookup on Eli's calendar (server-side),
 * keeping the same `BookingDay[]` shape so the modal does not change.
 */

export const BOOKING_TIMEZONE = "America/Sao_Paulo";
/** Brasília has had no daylight saving since 2019. */
const BRT_OFFSET = "-03:00";

export const BOOKING_DURATION_MIN = 45;
/** Days ahead the agenda is open, counted from today in Brasília. */
export const BOOKING_HORIZON_DAYS = 42;

const DAILY_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

export type BookingDay = {
  /** YYYY-MM-DD in Brasília time. */
  date: string;
  /** HH:mm slot starts, Brasília time. */
  slots: string[];
};

/** Today's date in Brasília as YYYY-MM-DD. */
export function todayInBrasilia(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: BOOKING_TIMEZONE }).format(now);
}

export function addDays(date: string, days: number) {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function weekdayOf(date: string) {
  return new Date(`${date}T12:00:00Z`).getUTCDay();
}

/** ISO instant for a Brasília date + time, e.g. 2026-10-14T10:00:00-03:00. */
export function toSlotIso(date: string, time: string) {
  return `${date}T${time}:00${BRT_OFFSET}`;
}

/** Small stable hash so example "busy" slots do not reshuffle between renders. */
function seeded(key: string) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i += 1) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

export function getAvailability(now = new Date()): BookingDay[] {
  const today = todayInBrasilia(now);
  const days: BookingDay[] = [];

  // No same-day bookings: Eli needs time to confirm.
  for (let i = 1; i <= BOOKING_HORIZON_DAYS; i += 1) {
    const date = addDays(today, i);
    const weekday = weekdayOf(date);
    if (weekday === 0 || weekday === 6) continue;

    // Roughly one weekday in seven is fully booked (events, travel).
    if (seeded(`${date}:day`) < 0.14) {
      days.push({ date, slots: [] });
      continue;
    }

    const slots = DAILY_SLOTS.filter((time) => seeded(`${date}:${time}`) > 0.42);
    days.push({ date, slots });
  }

  return days;
}

export function isSlotAvailable(date: string, time: string, now = new Date()) {
  return getAvailability(now).some((day) => day.date === date && day.slots.includes(time));
}
