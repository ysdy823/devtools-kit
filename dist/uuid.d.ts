export interface UuidOptions {
    version?: '1' | '4';
    count?: number;
}
/**
 * Generate a UUID v4.
 */
export declare function uuidV4(): string;
/**
 * Generate a UUID v1 (time-based, simplified implementation).
 */
export declare function uuidV1(): string;
/**
 * Generate one or more UUIDs.
 */
export declare function uuidGenerate(options?: UuidOptions): string[];
