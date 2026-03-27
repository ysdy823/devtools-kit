"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestampConvert = timestampConvert;
exports.nowTimestamp = nowTimestamp;
/**
 * Convert a Unix timestamp (seconds or milliseconds) to multiple formats.
 */
function timestampConvert(input) {
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
function nowTimestamp() {
    return timestampConvert(Date.now());
}
