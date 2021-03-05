// Runtime: 92 ms, faster than 45.83% of JavaScript online submissions for Bag of Tokens.
// Memory Usage: 39.4 MB, less than 100.00% of JavaScript online submissions for Bag of Tokens.

const bagOfTokensScore = (tokens, P) => {
  // 토큰을 오름차순으로 정렬 (TypedArray를 써서 숫자 정렬을 빠르게 함)
  const _tokens = new Uint16Array(tokens).sort();
  let left = 0;
  let right = _tokens.length - 1;
  let score = 0;

  while (left <= right) {
    // 가장 작은 토큰들을 팔 수 있는 데까지 판매
    while (P >= _tokens[left]) {
      P -= _tokens[left++];
      score += 1;
    }
    // 점수가 있다면 사용해서 가장 비싼 토큰을 구매
    // 마지막 토큰일 경우 구매하지 않고 절약
    if (score && left < right && _tokens[left] <= P + _tokens[right]) {
      P += _tokens[right--];
      score -= 1;
    } else break;
  }

  return score;
};

describe('bag-of-tokens', () => {
  test.each`
    tokens                  | P      | output
    ${[100]}                | ${50}  | ${0}
    ${[100, 200]}           | ${150} | ${1}
    ${[100, 200, 300, 400]} | ${200} | ${2}
    ${[71, 55, 82]}         | ${54}  | ${0}
    ${[81, 45, 8]}          | ${32}  | ${1}
  `('returns $output from $tokens tokens and $P power', ({ tokens, P, output }) => {
    expect(bagOfTokensScore(tokens, P)).toBe(output);
  });
});
