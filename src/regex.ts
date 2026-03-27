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
export function regexTest(pattern: string, input: string, flags: string = 'g'): RegexResult {
  try {
    // Ensure 'g' flag is present for findAll behavior
    if (!flags.includes('g')) flags += 'g';
    const re = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];
    let m: RegExpExecArray | null;

    while ((m = re.exec(input)) !== null) {
      matches.push({
        match: m[0],
        start: m.index,
        end: m.index + m[0].length,
        groups: m.slice(1),
      });
      // Prevent infinite loop on zero-length matches
      if (m[0].length === 0) re.lastIndex++;
    }

    return { matches, count: matches.length, valid: true };
  } catch (e: any) {
    return { matches: [], count: 0, valid: false, error: e.message };
  }
}
