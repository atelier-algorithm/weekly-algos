// Runtime: 120 ms, faster than 62.96% of JavaScript online submissions for Out of Boundary Paths.
// Memory Usage: 46.1 MB, less than 62.96% of JavaScript online submissions for Out of Boundary Paths.

const MOD = 10 ** 9 + 7;

const findPaths = (m, n, N, i, j) => {
  let count = 0;
  let memo = { [i]: { [j]: 1 } };

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
        count %= MOD;
      }
    }
    memo = temp;
  }

  return count;
};

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
