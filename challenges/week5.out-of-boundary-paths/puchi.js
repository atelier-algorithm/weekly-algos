// Runtime: 120 ms, faster than 62.96% of JavaScript online submissions for Out of Boundary Paths.
// Memory Usage: 46.1 MB, less than 62.96% of JavaScript online submissions for Out of Boundary Paths.

const MOD = 10 ** 9 + 7;

const findPaths = (m, n, N, i, j) => {
  let count = 0;
  // 공이 존재하는 매트릭스 칸의 모음
  // WHEN i = 0, j = 1; memo = { "0": { "1": 1 } };
  let memo = { [i]: { [j]: 1 } };

  // N 횟수만큼 볼을 4방향으로 확산, 그리드의 가장자리에 있을 경우
  // 공이 그리드 바깥으로 나간 만큼 count를 가산.
  for (let times = 0; times < N; times += 1) {
    const temp = {};
    let $row;
    let $col;
    for (const row in memo) {
      $row = +row;
      for (const col in memo[row]) {
        $col = +col;
        const balls = memo[row][col];
        if (!$row) count += balls;
        else addValue(balls, $row - 1, $col, temp);
        if ($row === m - 1) count += balls;
        else addValue(balls, $row + 1, $col, temp);
        if (!$col) count += balls;
        else addValue(balls, $row, $col - 1, temp);
        if ($col === n - 1) count += balls;
        else addValue(balls, $row, $col + 1, temp);
        count %= MOD; // 정수 가드
      }
    }
    memo = temp;
  }

  return count;
};

// map 그리드의 (row, col) 지점에 value만큼의 공을 추가
function addValue(value, row, col, map) {
  if (!(row in map)) map[row] = {};
  map[row][col] = ((map[row][col] || 0) + value) % MOD;
}

describe('out-of-boundary-paths', () => {
  test.each`
    m     | n    | N     | i     | j    | output
    ${2}  | ${2} | ${2}  | ${0}  | ${0} | ${6}
    ${1}  | ${3} | ${3}  | ${0}  | ${1} | ${12}
    ${8}  | ${4} | ${10} | ${5}  | ${0} | ${43458}
    ${8}  | ${7} | ${16} | ${1}  | ${5} | ${102984580}
    ${36} | ${5} | ${50} | ${15} | ${3} | ${390153306}
  `('returns $output from [$m, $n, $N, $i, $j]', ({ m, n, N, i, j, output }) => {
    expect(findPaths(m, n, N, i, j)).toBe(output);
  });
});
