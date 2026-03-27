"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = hash;
exports.md5 = md5;
exports.sha1 = sha1;
exports.sha256 = sha256;
exports.sha512 = sha512;
const crypto_1 = require("crypto");
/**
 * Generate a hash of the input string using the specified algorithm.
 */
function hash(input, algorithm = 'sha256') {
    const valid = ['md5', 'sha1', 'sha256', 'sha512'];
    if (!valid.includes(algorithm)) {
        throw new Error(`Unknown algorithm: ${algorithm}. Supported: ${valid.join(', ')}`);
    }
    return (0, crypto_1.createHash)(algorithm).update(input, 'utf-8').digest('hex');
}
/** Shorthand for MD5 hash. */
function md5(input) { return hash(input, 'md5'); }
/** Shorthand for SHA1 hash. */
function sha1(input) { return hash(input, 'sha1'); }
/** Shorthand for SHA256 hash. */
function sha256(input) { return hash(input, 'sha256'); }
/** Shorthand for SHA512 hash. */
function sha512(input) { return hash(input, 'sha512'); }
