// ISO 8601 week helpers — Mon-start, year-aware.

export function isoWeekOf(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNum).padStart(2, "0")}`;
}

export function startOfIsoWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay() || 7; // Sun=0 -> 7
  if (day !== 1) d.setDate(d.getDate() - (day - 1));
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addWeeks(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n * 7);
  return d;
}

// Build the last `count` weeks ending at `now` (inclusive), in chronological order.
export function recentWeeks(now: Date, count: number): { iso: string; start: Date }[] {
  const thisWeek = startOfIsoWeek(now);
  const out: { iso: string; start: Date }[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const start = addWeeks(thisWeek, -i);
    out.push({ iso: isoWeekOf(start), start });
  }
  return out;
}

// Current consecutive cooked weeks ending at `now`.
export function currentStreak(cookedSet: Set<string>, now: Date): number {
  let streak = 0;
  let cursor = startOfIsoWeek(now);
  while (cookedSet.has(isoWeekOf(cursor))) {
    streak++;
    cursor = addWeeks(cursor, -1);
  }
  return streak;
}
