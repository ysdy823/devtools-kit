export interface TimestampResult {
    utc: string;
    iso: string;
    unix: number;
    unixMs: number;
}
/**
 * Convert a Unix timestamp (seconds or milliseconds) to multiple formats.
 */
export declare function timestampConvert(input: string | number): TimestampResult;
/**
 * Get the current timestamp in all formats.
 */
export declare function nowTimestamp(): TimestampResult;
