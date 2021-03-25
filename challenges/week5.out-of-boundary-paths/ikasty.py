# Runtime: 112 ms, faster than 88.48% of Python3 online submissions
# Memory Usage: 14.2 MB, less than 98.39% of Python3 online submissions
class Solution:
    def findPaths(self, m: int, n: int, N: int, i: int, j: int) -> int:
        if N == 0: return 0
        paths = [[[0 for z in range(n)] for y in range(m)] for x in range(N)] # N x m x n
        result = 0

        # init
        paths[0][i][j] = 1
        # 가장자리 값을 더하기
        result += sum([i[0] for i in paths[0]])
        result += sum([i[-1] for i in paths[0]])
        result += sum(paths[0][0])
        result += sum(paths[0][-1])

        x_start = i
        x_end = i+1
        for depth in range(1, N):
            # hack for reduce memory
            # key는 0 또는 1로서, paths 계산 시 2개의 table을 번갈아가면서 사용하게 한다
            key = depth % 2

            # hack for reduce loop
            # 기존 시작줄의 윗줄부터, 기존 끝줄의 다음줄까지만 루프
            if x_start > 0:
                x_start -= 1
            if x_end < m:
                x_end += 1

            for x in range(x_start, x_end):
                # hack for reduce loop
                # 항상 체스판의 흰색 혹은 검은색만 사용한다
                start = (i + j + key + x) % 2
                for y in range(start, n, 2):
                    paths[key][x][y] = 0
                    if x > 0:
                        paths[key][x][y] += paths[key-1][x-1][y]
                    if y > 0:
                        paths[key][x][y] += paths[key-1][x][y-1]
                    if x < m-1:
                        paths[key][x][y] += paths[key-1][x+1][y]
                    if y < n-1:
                        paths[key][x][y] += paths[key-1][x][y+1]

            # 가장자리 값을 더하기
            result += sum([i[0] for i in paths[key]])
            result += sum([i[-1] for i in paths[key]])
            result += sum(paths[key][0])
            result += sum(paths[key][-1])

        return result % (10 ** 9 + 7)
