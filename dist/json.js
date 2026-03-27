"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonFormat = jsonFormat;
exports.jsonMinify = jsonMinify;
exports.jsonValidate = jsonValidate;
/**
 * Format a JSON string with indentation.
 */
function jsonFormat(input, options = {}) {
    const { indent = 2, sortKeys = false } = options;
    try {
        let parsed = JSON.parse(input);
        if (sortKeys) {
            parsed = sortObject(parsed);
        }
        return { result: JSON.stringify(parsed, null, indent), valid: true };
    }
    catch (e) {
        return { result: e.message, valid: false };
    }
}
/**
 * Minify a JSON string by removing all whitespace.
 */
function jsonMinify(input) {
    try {
        const parsed = JSON.parse(input);
        return { result: JSON.stringify(parsed), valid: true };
    }
    catch (e) {
        return { result: e.message, valid: false };
    }
}
/**
 * Validate whether a string is valid JSON.
 */
function jsonValidate(input) {
    try {
        JSON.parse(input);
        return true;
    }
    catch {
        return false;
    }
}
function sortObject(obj) {
    if (Array.isArray(obj))
        return obj.map(sortObject);
    if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).sort().reduce((sorted, key) => {
            sorted[key] = sortObject(obj[key]);
            return sorted;
        }, {});
    }
    return obj;
}
