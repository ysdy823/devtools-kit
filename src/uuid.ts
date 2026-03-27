import { randomUUID } from 'crypto';

export interface UuidOptions {
  version?: '1' | '4';
  count?: number;
}

/**
 * Generate a UUID v4.
 */
export function uuidV4(): string {
  return randomUUID();
}

/**
 * Generate a UUID v1 (time-based, simplified implementation).
 */
export function uuidV1(): string {
  // Node.js crypto doesn't have v1 built-in; we implement a simple time-based UUID
  const now = Date.now();
  const high = Math.floor(now / 0x100000000);
  const low = now & 0xffffffff;
  const rand = () => Math.floor(Math.random() * 16).toString(16);
  const hex = (n: number, len: number) => n.toString(16).padStart(len, '0');
  return [
    hex(low, 8),
    hex(high & 0xffff, 4),
    '1' + rand() + rand() + rand(),
    (0x80 | (Math.random() * 0x3f) | 0).toString(16).padStart(2, '0') + rand() + rand(),
    Array.from({ length: 12 }, rand).join(''),
  ].join('-');
}

/**
 * Generate one or more UUIDs.
 */
export function uuidGenerate(options: UuidOptions = {}): string[] {
  const { version = '4', count = 1 } = options;
  const safeCount = Math.min(Math.max(1, count), 100);
  const generator = version === '1' ? uuidV1 : uuidV4;
  return Array.from({ length: safeCount }, generator);
}
