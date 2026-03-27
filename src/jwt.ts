export interface JwtResult {
  header: Record<string, any> | string;
  payload: Record<string, any> | string;
  signature?: string;
}

/**
 * Decode a JWT token without verification.
 * Returns the header, payload, and signature.
 */
export function jwtDecode(token: string): JwtResult {
  const parts = token.trim().split('.');
  if (parts.length < 2 || parts.length > 3) {
    throw new Error('Invalid JWT format: expected 2 or 3 parts separated by dots');
  }

  const result: JwtResult = {
    header: decodePart(parts[0], 'header'),
    payload: decodePart(parts[1], 'payload'),
  };

  if (parts.length === 3) {
    result.signature = parts[2];
  }

  return result;
}

function decodePart(part: string, name: string): Record<string, any> | string {
  // Add padding
  const padded = part + '='.repeat((4 - (part.length % 4)) % 4);
  try {
    const decoded = Buffer.from(padded, 'base64url').toString('utf-8');
    return JSON.parse(decoded);
  } catch {
    return `Could not decode ${name}`;
  }
}
