# Runtime: 76 ms, faster than 96.00% of Python3 online submissions
# Memory Usage: 14.6 MB, less than 74.40% of Python3 online submissions
class Solution:
    def diagonalSort(self, mat: List[List[int]]) -> List[List[int]]:
        m, n = len(mat), len(mat[0])

        # row-wise sort
        for row in range(m):
            diagonal = sorted([ mat[i][j] for (i, j) in zip(range(row, m), range(n)) ])
            for (i, j, x) in zip(range(row, m), range(n), diagonal):
                mat[i][j] = x

        # column-wise sort
        for col in range(1, n):
            diagonal = sorted([ mat[i][j] for (i, j) in zip(range(m), range(col, n)) ])
            for (i, j, x) in zip(range(m), range(col, n), diagonal):
                mat[i][j] = x

        return mat