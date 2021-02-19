// v3
// Runtime: 88 ms, faster than 78.97% of JavaScript online submissions for Longest Substring with At Least K Repeating Characters.
// Memory Usage: 39.4 MB, less than 91.85% of JavaScript online submissions for Longest Substring with At Least K Repeating Characters.
const longestSubstring = (str, k) => {
  if (k < 2) return str.length;

  const find = substr => {
    // count repetitions
    const seen = {};
    for (const char of substr) seen[char] = seen[char] + 1 || 1;
    // find characters that repeted less than `k` times
    const less = Object.keys(seen).filter(char => seen[char] < k);
    // update max length if the condition is met
    if (!less.length) return substr.length;
    // repeat the process with substrings excluding those characters
    const matches = substr.match(new RegExp(`[^${less.join('')}]+`, 'g'));
    return matches ? matches.reduce((maxLength, match) => Math.max(maxLength, find(match)), 0) : 0;
  };

  return Math.max(find(str));
};

/* v2
// Runtime: 88 ms, faster than 78.97% of JavaScript online submissions for Longest Substring with At Least K Repeating Characters.
// Memory Usage: 40.1 MB, less than 77.25% of JavaScript online submissions for Longest Substring with At Least K Repeating Characters.
const longestSubstring = (str, k) => {
  if (k < 2) return str.length;

  let maxLength = 0;

  const find = substr => {
    // count repetitions
    const seen = {};
    for (const char of substr) seen[char] = seen[char] + 1 || 1;
    // find character that repeted less than `k` times
    const less = Object.keys(seen).filter(char => seen[char] < k);
    if (!less.length) {
      maxLength = Math.max(maxLength, substr.length);
      return;
    }
    // repeat the process with substring
    const matches = substr.match(new RegExp(`[^${less.join('')}]+`, 'g'));
    if (matches) for (const match of matches) find(match);
  };

  find(str);

  return maxLength;
};
*/

/* v1, failed
const longestSubstring = (str, k) => {
  const { length } = str;
  const seen = {};

  for (let i = 0; i < length; i += 1) {
    const char = str[i];
    seen[char] = seen[char] + 1 || 1;
  }

  const less = Object.keys(seen).filter(char => seen[char] >= k);
  if (!less.length) return length;

  const match = new RegExp(`[^${less.join('')}]+`).exec(str);
  return match ? match[0].length : 0;
};
*/

describe('longest-substring', () => {
  test.each`
    s            | k    | output
    ${'aaabb'}   | ${3} | ${3}
    ${'ababbc'}  | ${2} | ${5}
    ${'ababacb'} | ${3} | ${0}
  `('returns $output from $input', ({ s, k, output }) => {
    expect(longestSubstring(s, k)).toBe(output);
  });
});
