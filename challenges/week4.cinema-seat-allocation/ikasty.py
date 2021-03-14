# Runtime: 612 ms, faster than 93.80% of Python3 online submissions
# Memory Usage: 17.8 MB, less than 78.29% of Python3 online submissions
from collections import defaultdict

class Solution:
    def maxNumberOfFamilies(self, n: int, reservedSeats: List[List[int]]) -> int:
        reserved = defaultdict(int)
        for row, col in reservedSeats:
            if col in range(2, 10):
                reserved[row] |= 1 << (10 - col)

        group = (n - len(reserved)) * 2
        for row in reserved:
            if reserved[row] & 0b0000011110 == 0 or \
               reserved[row] & 0b0001111000 == 0 or \
               reserved[row] & 0b0111100000 == 0:
                group += 1
        return group
