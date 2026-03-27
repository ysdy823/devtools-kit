export interface RegexMatch {
    match: string;
    start: number;
    end: number;
    groups: (string | undefined)[];
}
export interface RegexResult {
    matches: RegexMatch[];
    count: number;
    valid: boolean;
    error?: string;
}
/**
 * Test a regex pattern against a string and return all matches.
 */
export declare function regexTest(pattern: string, input: string, flags?: string): RegexResult;
