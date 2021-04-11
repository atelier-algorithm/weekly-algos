# Runtime: 296 ms, faster than 14.83% of Python3 online submissions
# Memory Usage: 14.7 MB, less than 93.40% of Python3 online submissions
from collections import defaultdict

class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        N = len(grid)

        def check_hole(step):
            hole = defaultdict(lambda: None)

            # 정상 "웅덩이" 인지 체크
            def valid_hole(x, y):
                if x < 0 or x >= N:
                    return False
                if y < 0 or y >= N:
                    return False
                if grid[x][y] > step:
                    return False
                return True

            # 대표 웅덩이 찾기
            def root(a):
                while hole[a] != a and hole[a] != None:
                    a = hole[a]
                return a

            # 웅덩이 그룹 합치기
            def merge_hole(a, b):
                a, b = root(a), root(b)
                _from = max(a, b)
                _to = min(a, b)
                if (_from != _to):
                    hole[_from] = _to

            # (i, j) 는 고유값 `grid[i][j]`를 가지고 있다. 따라서 이 고유값을
            # 웅덩이(hole)의 번호로 사용할 수 있다. hole[고유값]이 None이면
            # 현재 (i, j)가 루트라는 뜻이고, 그렇지 않다면 가리키고 있는 고유값이
            # 상위 루트라는 뜻이다. 같은 루트를 가진 (i, j) 쌍은 연결되어 있다.
            for i in range(N):
                for j in range(N):
                    if grid[i][j] > step:
                        continue
                    if valid_hole(i-1, j):
                        merge_hole(grid[i][j], grid[i-1][j])
                    if valid_hole(i, j-1):
                        merge_hole(grid[i][j], grid[i][j-1])

            return root(grid[0][0]) == root(grid[-1][-1])

        # start == 실패한 step
        start = max(N*2-2, grid[0][0], grid[-1][-1])
        # end   == 성공한 step
        end = N*N - 1

        # init check
        if check_hole(start):
            return start

        while (start + 1 < end):
            step = start + int((end - start) / 2)
            if check_hole(step):
                end = step
            else:
                start = step

        return end
