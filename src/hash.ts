import { createHash } from 'crypto';

export type HashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha512';

/**
 * Generate a hash of the input string using the specified algorithm.
 */
export function hash(input: string, algorithm: HashAlgorithm = 'sha256'): string {
  const valid: HashAlgorithm[] = ['md5', 'sha1', 'sha256', 'sha512'];
  if (!valid.includes(algorithm)) {
    throw new Error(`Unknown algorithm: ${algorithm}. Supported: ${valid.join(', ')}`);
  }
  return createHash(algorithm).update(input, 'utf-8').digest('hex');
}

/** Shorthand for MD5 hash. */
export function md5(input: string): string { return hash(input, 'md5'); }

/** Shorthand for SHA1 hash. */
export function sha1(input: string): string { return hash(input, 'sha1'); }

/** Shorthand for SHA256 hash. */
export function sha256(input: string): string { return hash(input, 'sha256'); }

/** Shorthand for SHA512 hash. */
export function sha512(input: string): string { return hash(input, 'sha512'); }
