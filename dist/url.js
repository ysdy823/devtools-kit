"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncode = urlEncode;
exports.urlDecode = urlDecode;
/**
 * URL-encode a string (encodes all special characters).
 */
function urlEncode(input) {
    return encodeURIComponent(input);
}
/**
 * URL-decode a string.
 */
function urlDecode(input) {
    return decodeURIComponent(input);
}
