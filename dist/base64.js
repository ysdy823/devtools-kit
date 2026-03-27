"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64Encode = base64Encode;
exports.base64Decode = base64Decode;
/**
 * Encode a string to Base64.
 */
function base64Encode(input) {
    return Buffer.from(input, 'utf-8').toString('base64');
}
/**
 * Decode a Base64 string.
 */
function base64Decode(input) {
    return Buffer.from(input, 'base64').toString('utf-8');
}
