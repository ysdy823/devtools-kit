export interface TimestampResult {
  utc: string;
  iso: string;
  unix: number;
  unixMs: number;
}

/**
 * Convert a Unix timestamp (seconds or milliseconds) to multiple formats.
 */
export function timestampConvert(input: string | number): TimestampResult {
  let ts = typeof input === 'string' ? parseFloat(input) : input;
  if (isNaN(ts)) {
    throw new Error(`Invalid timestamp: ${input}`);
  }
  // Auto-detect milliseconds
  if (ts > 1e12) {
    ts = ts / 1000;
  }
  const date = new Date(ts * 1000);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid timestamp: ${input}`);
  }
  return {
    utc: date.toISOString().replace('T', ' ').replace(/\.\d+Z$/, ' UTC'),
    iso: date.toISOString(),
    unix: Math.floor(ts),
    unixMs: Math.floor(ts * 1000),
  };
}

/**
 * Get the current timestamp in all formats.
 */
export function nowTimestamp(): TimestampResult {
  return timestampConvert(Date.now());
}
