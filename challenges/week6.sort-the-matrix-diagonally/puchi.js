// Runtime: 88 ms, faster than 96.65% of JavaScript online submissions for Sort the Matrix Diagonally.
// Memory Usage: 40.5 MB, less than 97.30% of JavaScript online submissions for Sort the Matrix Diagonally.

function diagonalSort(matrix) {
  const lastRow = matrix.length - 1;
  const lastCol = matrix[0].length - 1;
  let row = 1;
  let col = lastCol;

  // 우상단 -> 좌하단으로 대각선 정렬한 후 재할당
  // (포함하는 원소가 1개뿐인 두 꼭지점 제외)
  while (col) {
    const offset = Math.min(row, col);
    new Int8Array(offset + 1)
      .map((_, i) => matrix[row - i][col - i])
      .sort()
      .forEach((value, i) => {
        matrix[row - offset + i][col - offset + i] = value;
      });
    // 시작 지점을 이동
    if (row !== lastRow) {
      row += 1; // 우상단 -> 우하단
    } else {
      col -= 1; // 우하단 -> 좌하단
    }
  }

  return matrix;
}

describe('sort-the-matrix-diagonally', () => {
  it('should sort matrices diagonally #1', () => {
    const input = [
      [3, 3, 1, 1],
      [2, 2, 1, 2],
      [1, 1, 1, 2],
    ];
    const output = [
      [1, 1, 1, 1],
      [1, 2, 2, 2],
      [1, 2, 3, 3],
    ];
    expect(diagonalSort(input)).toEqual(output);
  });

  it('should sort matrices diagonally #2', () => {
    const input = [
      [11, 25, 66, 1, 69, 7],
      [23, 55, 17, 45, 15, 52],
      [75, 31, 36, 44, 58, 8],
      [22, 27, 33, 25, 68, 4],
      [84, 28, 14, 11, 5, 50],
    ];
    const output = [
      [5, 17, 4, 1, 52, 7],
      [11, 11, 25, 45, 8, 69],
      [14, 23, 25, 44, 58, 15],
      [22, 27, 31, 36, 50, 66],
      [84, 28, 75, 33, 55, 68],
    ];
    expect(diagonalSort(input)).toEqual(output);
  });
});
