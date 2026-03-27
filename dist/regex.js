"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexTest = regexTest;
/**
 * Test a regex pattern against a string and return all matches.
 */
function regexTest(pattern, input, flags = 'g') {
    try {
        // Ensure 'g' flag is present for findAll behavior
        if (!flags.includes('g'))
            flags += 'g';
        const re = new RegExp(pattern, flags);
        const matches = [];
        let m;
        while ((m = re.exec(input)) !== null) {
            matches.push({
                match: m[0],
                start: m.index,
                end: m.index + m[0].length,
                groups: m.slice(1),
            });
            // Prevent infinite loop on zero-length matches
            if (m[0].length === 0)
                re.lastIndex++;
        }
        return { matches, count: matches.length, valid: true };
    }
    catch (e) {
        return { matches: [], count: 0, valid: false, error: e.message };
    }
}
