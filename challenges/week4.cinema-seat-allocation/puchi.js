// https://leetcode.com/problems/cinema-seat-allocation/

// Runtime: 144 ms, faster than 68.75% of JavaScript online submissions for Cinema Seat Allocation.
// Memory Usage: 46.1 MB, less than 87.50% of JavaScript online submissions for Cinema Seat Allocation.

const maxNumberOfFamilies = (n, reserved) => {
  // 4인석의 갯수
  let families = 0;
  // 검사한 줄, 지난 행
  let [checkedRows, lastRow] = [1, 1];
  // 2345, 4567, 6789가 각각 비어 있는지 여부
  let [isLeftEmpty, isMiddleEmpty, isRightEmpty] = [true, true, true];

  // 예약석을 행(오름차순) + 열(오름차순) 순으로 정렬하고,
  // 예약석이 있는 줄에서 4인석의 갯수를 계산함
  reserved.sort(([aRow, aCol], [zRow, zCol]) => (aRow === zRow ? aCol - zCol : aRow - zRow));

  for (const [row, col] of reserved) {
    if (row !== lastRow) {
      families += (isLeftEmpty || isMiddleEmpty || isRightEmpty) + (isLeftEmpty && isRightEmpty);
      checkedRows += 1;
      lastRow = row;
      [isLeftEmpty, isMiddleEmpty, isRightEmpty] = [true, true, true];
    }
    if (isLeftEmpty) isLeftEmpty = offRange(col, 2, 5);
    if (isMiddleEmpty) isMiddleEmpty = offRange(col, 4, 7);
    if (isRightEmpty) isRightEmpty = offRange(col, 6, 9);
  }

  // 마지막 행 처리
  families += (isLeftEmpty || isMiddleEmpty || isRightEmpty) + (isLeftEmpty && isRightEmpty);

  // 예약석이 없는 열은 2N만큼 4인석을 만들 수 있음
  return families + 2 * (n - checkedRows);
};

function offRange(value, min, max) {
  return value < min || max < value;
}

describe('cinema-seat-allocation', () => {
  test.each`
    n    | reservedSeats                                                                                                                | output
    ${3} | ${[[1, 2], [1, 3], [1, 8], [2, 6], [3, 1], [3, 10]]}                                                                         | ${4}
    ${2} | ${[[2, 1], [1, 8], [2, 6]]}                                                                                                  | ${2}
    ${4} | ${[[4, 3], [1, 4], [4, 6], [1, 7]]}                                                                                          | ${4}
    ${2} | ${[[1, 5], [2, 8], [2, 10], [2, 2], [1, 6], [1, 10], [1, 1], [2, 5], [1, 2]]}                                                | ${0}
    ${5} | ${[[4, 7], [4, 1], [3, 1], [5, 9], [4, 4], [3, 7], [1, 3], [5, 5], [1, 6], [1, 8], [3, 9], [2, 9], [1, 4], [1, 9], [1, 10]]} | ${2}
  `(
    'returns $output from $n seats with $reservedSeats reserved.',
    ({ n, reservedSeats, output }) => {
      expect(maxNumberOfFamilies(n, reservedSeats)).toBe(output);
    }
  );
});
