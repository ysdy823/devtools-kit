"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtDecode = jwtDecode;
/**
 * Decode a JWT token without verification.
 * Returns the header, payload, and signature.
 */
function jwtDecode(token) {
    const parts = token.trim().split('.');
    if (parts.length < 2 || parts.length > 3) {
        throw new Error('Invalid JWT format: expected 2 or 3 parts separated by dots');
    }
    const result = {
        header: decodePart(parts[0], 'header'),
        payload: decodePart(parts[1], 'payload'),
    };
    if (parts.length === 3) {
        result.signature = parts[2];
    }
    return result;
}
function decodePart(part, name) {
    // Add padding
    const padded = part + '='.repeat((4 - (part.length % 4)) % 4);
    try {
        const decoded = Buffer.from(padded, 'base64url').toString('utf-8');
        return JSON.parse(decoded);
    }
    catch {
        return `Could not decode ${name}`;
    }
}
