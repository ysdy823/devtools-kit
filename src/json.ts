export interface JsonFormatOptions {
  indent?: number;
  sortKeys?: boolean;
}

export interface JsonResult {
  result: string;
  valid: boolean;
}

/**
 * Format a JSON string with indentation.
 */
export function jsonFormat(input: string, options: JsonFormatOptions = {}): JsonResult {
  const { indent = 2, sortKeys = false } = options;
  try {
    let parsed = JSON.parse(input);
    if (sortKeys) {
      parsed = sortObject(parsed);
    }
    return { result: JSON.stringify(parsed, null, indent), valid: true };
  } catch (e: any) {
    return { result: e.message, valid: false };
  }
}

/**
 * Minify a JSON string by removing all whitespace.
 */
export function jsonMinify(input: string): JsonResult {
  try {
    const parsed = JSON.parse(input);
    return { result: JSON.stringify(parsed), valid: true };
  } catch (e: any) {
    return { result: e.message, valid: false };
  }
}

/**
 * Validate whether a string is valid JSON.
 */
export function jsonValidate(input: string): boolean {
  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
}

function sortObject(obj: any): any {
  if (Array.isArray(obj)) return obj.map(sortObject);
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).sort().reduce((sorted: any, key) => {
      sorted[key] = sortObject(obj[key]);
      return sorted;
    }, {});
  }
  return obj;
}
