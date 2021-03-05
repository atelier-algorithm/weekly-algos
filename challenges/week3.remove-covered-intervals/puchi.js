// Runtime: 80 ms, faster than 96.00% of JavaScript online submissions for Remove Covered Intervals.
// Memory Usage: 40.7 MB, less than 56.00% of JavaScript online submissions for Remove Covered Intervals.

const removeCoveredIntervals = intervals => {
  const { length } = intervals;
  let count = 1;

  // intervals를 시작 지점 오름차순 -> 끝나는 지점 내림차순으로 정렬
  // (같은 지점에서 시작하는 복수의 intervals는 앞쪽이 뒤쪽을 반드시 커버함)
  intervals.sort(([a1, a2], [z1, z2]) => (a1 === z1 ? z2 - a2 : a1 - z1));

  // 나머지 intervals를 탐색하면서 연속되는 intervals 중 커버되지 않는 경우들을 카운트
  // 시작 지점을 기준으로 오름차순 정렬됐기 때문에, 끝나는 지점이 이전 기록된 끝나는 지점보다
  // 작은 값일 경우 커버되는 interval
  for (let i = 1, [[, prevEnd]] = intervals, start, end; i < length; i += 1) {
    [start, end] = intervals[i];

    if (start > prevEnd || end > prevEnd) {
      prevEnd = end;
      count += 1;
    }
  }

  return count;
};

describe('remove-covered-intervals', () => {
  test.each`
    intervals                      | output
    ${[[1, 4], [3, 6], [2, 8]]}    | ${2}
    ${[[1, 4], [2, 3]]}            | ${1}
    ${[[0, 10], [5, 12]]}          | ${2}
    ${[[3, 10], [4, 10], [5, 11]]} | ${2}
    ${[[1, 2], [1, 4], [3, 4]]}    | ${1}
  `('returns $output from $intervals', ({ intervals, output }) => {
    expect(removeCoveredIntervals(intervals)).toBe(output);
  });
});
