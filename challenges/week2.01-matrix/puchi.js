// Runtime: 176 ms, faster than 71.26% of JavaScript online submissions for 01 Matrix.
// Memory Usage: 48.9 MB, less than 55.91% of JavaScript online submissions for 01 Matrix.

const updateMatrix = matrix => {
  // BFS 큐, 포인터
  const queue = [];
  let tail = 0;
  // 거리
  const distances = matrix.map((row, rowIndex) =>
    row.map((node, colIndex) => {
      if (!node) queue.push([rowIndex, colIndex]);
      return node ? Infinity : node;
    })
  );
  // 인접한 셀 (top, right, bottom, left) 오프셋
  const dRow = [-1, 0, 1, 0];
  const dCol = [0, 1, 0, -1];

  while (queue[tail]) {
    const [row, col] = queue[tail++];
    const distance = distances[row][col];
    // 인접한 셀을 돌면서
    for (let i = 0; i < 4; i += 1) {
      const $row = row + dRow[i];
      const $col = col + dCol[i];
      // 매트릭스를 벗어난 셀 스킵
      if (!($row in matrix) || !($col in matrix[$row])) continue;
      // 거리 최적화
      const $distance = distances[$row][$col];
      if ($distance > distance + 1) {
        distances[$row][$col] = distance + 1;
        queue.push([$row, $col]);
      }
    }
  }

  return distances;
};

describe('01-matrix', () => {
  test.each`
    input                                                      | output
    ${[[0, 0, 0], [0, 1, 0], [0, 0, 0]]}                       | ${[[0, 0, 0], [0, 1, 0], [0, 0, 0]]}
    ${[[0, 0, 0], [0, 1, 0], [1, 1, 1]]}                       | ${[[0, 0, 0], [0, 1, 0], [1, 2, 1]]}
    ${[[0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]]} | ${[[0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]]}
  `('returns $output from $input', ({ input, output }) => {
    expect(updateMatrix(input)).toEqual(output);
  });
});
