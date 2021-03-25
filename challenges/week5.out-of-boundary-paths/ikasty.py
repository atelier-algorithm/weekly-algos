# Runtime: 280 ms, faster than 29.72% of Python3 online submissions
# Memory Usage: 14.4 MB, less than 89.17% of Python3 online submissions
class Solution:
    def findPaths(self, m: int, n: int, N: int, i: int, j: int) -> int:
        if N == 0: return 0
        paths = [[[0 for z in range(n)] for y in range(m)] for x in range(N)] # N x m x n
        result = 0

        # init
        paths[0][i][j] = 1
        result += sum([i[0] for i in paths[0]])
        result += sum([i[-1] for i in paths[0]])
        result += sum(paths[0][0])
        result += sum(paths[0][-1])

        for depth in range(1, N):
            for x in range(m):
                for y in range(n):
                    paths[depth][x][y] = 0
                    if x > 0:
                        paths[depth][x][y] += paths[depth-1][x-1][y]
                    if y > 0:
                        paths[depth][x][y] += paths[depth-1][x][y-1]
                    if x < m-1:
                        paths[depth][x][y] += paths[depth-1][x+1][y]
                    if y < n-1:
                        paths[depth][x][y] += paths[depth-1][x][y+1]

            result += sum([i[0] for i in paths[depth]])
            result += sum([i[-1] for i in paths[depth]])
            result += sum(paths[depth][0][:])
            result += sum(paths[depth][-1][:])

        return result % (10 ** 9 + 7)
