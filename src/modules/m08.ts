// Module 08: formatting and coercion helpers for the reporting pipeline.
// These are pure functions with no I/O so they can be unit-tested in isolation.

export function pad8(value: number, width = 2): string {
  return String(value).padStart(width, '0');
}

export function clamp8(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export function percent8(part: number, whole: number): string {
  if (whole === 0) return '0.0%';
  return `${((part / whole) * 100).toFixed(1)}%`;
}

export function titleCase8(input: string): string {
  return input
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

export function truncate8(input: string, limit = 80): string {
  if (input.length <= limit) return input;
  return `${input.slice(0, Math.max(0, limit - 1))}…`;
}

export function formatBytes8(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(1)} ${units[unit]}`;
}

export function sortByKey8<T extends Record<string, unknown>>(rows: T[], key: keyof T): T[] {
  return [...rows].sort((a, b) => {
    const left = a[key];
    const right = b[key];
    if (typeof left === 'number' && typeof right === 'number') return left - right;
    return String(left).localeCompare(String(right));
  });
}

export function groupBy8<T extends Record<string, unknown>>(rows: T[], key: keyof T): Map<string, T[]> {
  const out = new Map<string, T[]>();
  for (const row of rows) {
    const bucket = String(row[key]);
    const existing = out.get(bucket);
    if (existing) existing.push(row);
    else out.set(bucket, [row]);
  }
  return out;
}

export function sumBy8<T extends Record<string, unknown>>(rows: T[], key: keyof T): number {
  let total = 0;
  for (const row of rows) {
    const value = row[key];
    if (typeof value === 'number' && Number.isFinite(value)) total += value;
  }
  return total;
}

export function uniqueBy8<T>(rows: T[], key: (row: T) => string): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const row of rows) {
    const marker = key(row);
    if (seen.has(marker)) continue;
    seen.add(marker);
    out.push(row);
  }
  return out;
}

export function chunk8<T>(rows: T[], size: number): T[][] {
  if (size <= 0) throw new Error('chunk size must be positive');
  const out: T[][] = [];
  for (let i = 0; i < rows.length; i += size) {
    out.push(rows.slice(i, i + size));
  }
  return out;
}

export function debounce8<A extends unknown[]>(fn: (...args: A) => void, wait = 150) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: A) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}
