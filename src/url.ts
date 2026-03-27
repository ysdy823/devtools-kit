/**
 * URL-encode a string (encodes all special characters).
 */
export function urlEncode(input: string): string {
  return encodeURIComponent(input);
}

/**
 * URL-decode a string.
 */
export function urlDecode(input: string): string {
  return decodeURIComponent(input);
}
