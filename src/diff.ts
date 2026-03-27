/**
 * Generate a unified diff between two text strings.
 * Returns empty string if texts are identical.
 */
export function textDiff(text1: string, text2: string): string {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');

  // Simple Myers-like diff using LCS
  const lcs = computeLCS(lines1, lines2);
  const hunks = buildUnifiedDiff(lines1, lines2, lcs);

  if (hunks.length === 0) return '';

  const output: string[] = ['--- original', '+++ modified'];
  for (const hunk of hunks) {
    output.push(hunk);
  }
  return output.join('\n');
}

function computeLCS(a: string[], b: string[]): [number, number][] {
  const m = a.length;
  const n = b.length;
  // DP table
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  // Backtrack
  const result: [number, number][] = [];
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      result.unshift([i - 1, j - 1]);
      i--; j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  return result;
}

function buildUnifiedDiff(a: string[], b: string[], lcs: [number, number][]): string[] {
  const changes: { type: ' ' | '-' | '+'; line: string; aIdx: number; bIdx: number }[] = [];
  let ai = 0, bi = 0, li = 0;

  while (ai < a.length || bi < b.length) {
    if (li < lcs.length && ai === lcs[li][0] && bi === lcs[li][1]) {
      changes.push({ type: ' ', line: a[ai], aIdx: ai, bIdx: bi });
      ai++; bi++; li++;
    } else if (li < lcs.length && ai < lcs[li][0]) {
      changes.push({ type: '-', line: a[ai], aIdx: ai, bIdx: bi });
      ai++;
    } else if (li < lcs.length && bi < lcs[li][1]) {
      changes.push({ type: '+', line: b[bi], aIdx: ai, bIdx: bi });
      bi++;
    } else if (li >= lcs.length && ai < a.length) {
      changes.push({ type: '-', line: a[ai], aIdx: ai, bIdx: bi });
      ai++;
    } else if (li >= lcs.length && bi < b.length) {
      changes.push({ type: '+', line: b[bi], aIdx: ai, bIdx: bi });
      bi++;
    }
  }

  // Group into hunks with 3 lines of context
  const ctx = 3;
  const hunks: string[] = [];
  let hunkStart = -1;
  const changedIndices = changes.map((c, i) => c.type !== ' ' ? i : -1).filter(i => i >= 0);

  if (changedIndices.length === 0) return [];

  let groups: number[][] = [];
  let currentGroup: number[] = [changedIndices[0]];
  for (let i = 1; i < changedIndices.length; i++) {
    if (changedIndices[i] - changedIndices[i - 1] <= ctx * 2 + 1) {
      currentGroup.push(changedIndices[i]);
    } else {
      groups.push(currentGroup);
      currentGroup = [changedIndices[i]];
    }
  }
  groups.push(currentGroup);

  for (const group of groups) {
    const start = Math.max(0, group[0] - ctx);
    const end = Math.min(changes.length - 1, group[group.length - 1] + ctx);

    const hunkChanges = changes.slice(start, end + 1);
    let aStart = 0, aCount = 0, bStart = 0, bCount = 0;
    let first = true;
    for (const c of hunkChanges) {
      if (first) {
        aStart = c.aIdx + 1;
        bStart = c.bIdx + 1;
        first = false;
      }
      if (c.type !== '+') aCount++;
      if (c.type !== '-') bCount++;
    }

    hunks.push(`@@ -${aStart},${aCount} +${bStart},${bCount} @@`);
    for (const c of hunkChanges) {
      hunks.push(`${c.type}${c.line}`);
    }
  }

  return hunks;
}
