export type HashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha512';
/**
 * Generate a hash of the input string using the specified algorithm.
 */
export declare function hash(input: string, algorithm?: HashAlgorithm): string;
/** Shorthand for MD5 hash. */
export declare function md5(input: string): string;
/** Shorthand for SHA1 hash. */
export declare function sha1(input: string): string;
/** Shorthand for SHA256 hash. */
export declare function sha256(input: string): string;
/** Shorthand for SHA512 hash. */
export declare function sha512(input: string): string;
