# Runtime: 88 ms, faster than 98.70% of Python3 online submissions
# Memory Usage: 14.5 MB, less than 98.27% of Python3 online submissions

class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        N = len(grid)

        def check_hole(step):
            # 정상 "웅덩이" 인지 체크
            def valid_hole(x, y):
                if x < 0 or x >= N:
                    return False
                if y < 0 or y >= N:
                    return False
                if grid[x][y] > step:
                    return False
                return True

            stack = [(0, 0)]
            hole = set([(0, 0)])
            while len(stack) > 0:
                i, j = stack.pop()
                if (i, j) == (N-1, N-1):
                    return True

                for x, y in [(i-1, j), (i, j-1), (i+1, j), (i, j+1)]:
                    if valid_hole(x, y) and (x, y) not in hole:
                        hole.add((x, y))
                        stack.append((x, y))

            return False

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
