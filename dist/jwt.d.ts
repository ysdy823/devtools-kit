export interface JwtResult {
    header: Record<string, any> | string;
    payload: Record<string, any> | string;
    signature?: string;
}
/**
 * Decode a JWT token without verification.
 * Returns the header, payload, and signature.
 */
export declare function jwtDecode(token: string): JwtResult;
