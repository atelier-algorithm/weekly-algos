function solution(cookies) {
  const { length } = cookies;
  let maxSum = 0;

  for (let i = 1; i < length; ++i) {
    let [p1, p2] = [i - 1, i];
    let [sum1, sum2] = [cookies[p1], cookies[p2]];
    // p1, p2 포인터를 양쪽으로 확산하면서
    do {
      // 공평하게 나눠지는 합을 max에 갱신
      if (sum1 === sum2) maxSum = Math.max(maxSum, sum1);
      // 부족한 쪽에 쿠키를 더 나눠주되, 나눠줄 쿠키가 없으면 중단
      if (sum1 <= sum2) {
        if (--p1 === -1) break;
        sum1 += cookies[p1];
      } else {
        if (++p2 === length) break;
        sum2 += cookies[p2];
      }
    } while (0 <= p1 || p2 < length);
  }

  return maxSum;
}

describe('buying-cookies', () => {
  test.each`
    input           | output
    ${[1, 1, 2, 3]} | ${3}
    ${[1, 2, 4, 5]} | ${0}
  `('returns $output from $input', ({ input, output }) => {
    expect(solution(input)).toBe(output);
  });
});
