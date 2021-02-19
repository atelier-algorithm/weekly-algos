# Runtime: 440 ms, faster than 52.96% of Python3 online submissions.
# Memory Usage: 21.1 MB, less than 71.78% of Python3 online submissions.

class Solution:
    def gardenNoAdj(self, n: int, paths: List[List[int]]) -> List[int]:
        # n개의 빈 list: relative graph 생성용
        gardens = [[] for _ in range(n)]
        for (start, end) in paths:
            gardens[start - 1].append(end - 1)
            gardens[end - 1].append(start - 1)

        # n개의 0을 담은 list: 결과 생성용
        result = [0] * n
        for target in range(n):
            # 타겟에 연결된 garden이 가진 result set을 {1, 2, 3, 4} set 에서 제거
            flowers = {1, 2, 3, 4} - {result[garden] for garden in gardens[target]}
            # 남은 숫자 중 아무거나 기록
            result[target] = next(iter( flowers ))

        return result