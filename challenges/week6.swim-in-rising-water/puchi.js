// Runtime: 488 ms, faster than 29.69% of JavaScript online submissions for Swim in Rising Water.
// Memory Usage: 45.8 MB, less than 28.13% of JavaScript online submissions for Swim in Rising Water.

const offsets = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function swimInWater(grid) {
  let time = Math.max(2, grid[0][0]);
  while (!canReach(grid, time)) ++time;
  return time;
}

// time만큼의 시간이 흐른 후 grid 우하단에 도착할 수 있는지 검사
function canReach(grid, time, row = 0, col = 0, visited = {}) {
  const stop = grid.length - 1;
  // 그리드를 벗어남
  if (row < 0 || stop < row || col < 0 || stop < col) return false;
  // 이미 방문 or 수영할 수 없는 땅
  const height = grid[row][col];
  if (height in visited || time < height) return false;
  // 우하단 도착
  if (row === stop && col === stop) return true;

  visited[height] = true;

  for (const [drow, dcol] of offsets)
    if (canReach(grid, time, row + drow, col + dcol, visited)) return true;

  return false;
}

describe('swim-in-rising-water', () => {
  it('should return minimum time required before to be able to swim from top left to bottom right', () => {
    const grid1 = [
      [0, 2],
      [1, 3],
    ];
    expect(swimInWater(grid1)).toBe(3);

    const grid2 = [
      [0, 1, 2, 3, 4],
      [24, 23, 22, 21, 5],
      [12, 13, 14, 15, 16],
      [11, 17, 18, 19, 20],
      [10, 9, 8, 7, 6],
    ];
    expect(swimInWater(grid2)).toBe(16);

    const grid3 = [
      [10, 12, 4, 6],
      [9, 11, 3, 5],
      [1, 7, 13, 8],
      [2, 0, 15, 14],
    ];
    expect(swimInWater(grid3)).toBe(14);
  });
});
