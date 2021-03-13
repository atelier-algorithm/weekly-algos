# Runtime: 896 ms, faster than 5.04% of Python3 online submissions
# Memory Usage: 18.5 MB, less than 5.43% of Python3 online submissions
class Solution:
    def maxNumberOfFamilies(self, n: int, reservedSeats: List[List[int]]) -> int:
        reservedSeats.sort()
        target = sorted(list({seats[0] for seats in reservedSeats}))
        group = (n - len(target)) * 2
        pnt = 0
        for row in target:
            cols = []
            while pnt < len(reservedSeats) and reservedSeats[pnt][0] == row:
                cols.append(reservedSeats[pnt][1])
                pnt += 1

            seats = { int(x / 2 - 1) for x in cols if x in range(2, 10) } # 2 <= x < 10 to {0, 1, 2, 3}
            if seats == {0, 1} or seats == {2, 3} or seats == {0, 3}:
                group += 1
            elif len(seats) == 1:
                group += 1
            elif len(seats) == 0:
                group += 2

        return group
