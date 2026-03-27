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
export declare function jsonFormat(input: string, options?: JsonFormatOptions): JsonResult;
/**
 * Minify a JSON string by removing all whitespace.
 */
export declare function jsonMinify(input: string): JsonResult;
/**
 * Validate whether a string is valid JSON.
 */
export declare function jsonValidate(input: string): boolean;
