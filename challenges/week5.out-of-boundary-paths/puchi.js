const findPaths = (m, n, N, i, j) => {
  const stack = [[i, j, 0]];
  let count = 0;

  while (stack[0]) {
    const [x, y, depth] = stack.pop();
    // 그리드 바깥에 나간 경우를 카운트
    if (x === -1 || x === m || y === -1 || y === n) {
      count += 1;
      continue;
    }
    // 탐색 깊이가 N에 도달할 때까지 상하좌우로 1칸 이동
    if (depth < N) {
      if (y >= 0) stack.push([x, y - 1, depth + 1]);
      if (x < m) stack.push([x + 1, y, depth + 1]);
      if (y < n) stack.push([x, y + 1, depth + 1]);
      if (x >= 0) stack.push([x - 1, y, depth + 1]);
    }
  }

  return count % 1000000007;
};

// findPaths(2, 2, 2, 0, 0);

describe('out-of-boundary-paths', () => {
  test.each`
    m    | n    | N     | i    | j    | output
    ${2} | ${2} | ${2}  | ${0} | ${0} | ${6}
    ${1} | ${3} | ${3}  | ${0} | ${1} | ${12}
    ${8} | ${4} | ${10} | ${5} | ${0} | ${43458}
    ${8} | ${7} | ${16} | ${1} | ${5} | ${102984580}
  `('returns $output from [$m, $n, $N, $i, $j]', ({ m, n, N, i, j, output }) => {
    expect(findPaths(m, n, N, i, j)).toBe(output);
  });
});
