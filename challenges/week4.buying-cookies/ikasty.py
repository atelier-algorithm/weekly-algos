from itertools import accumulate

def solution(cookie):
    baskets = list(accumulate(cookie))
    def diff(start, end):
        if start > 0:
            return baskets[end] - baskets[start-1]
        else:
            return baskets[end]

    max_sum = 0
    for start in range(0, len(cookie)-1):
        for end in reversed(range(start+1, len(cookie))):
            target = diff(start, end)
            if target / 2 < max_sum:
                break
            if target % 2 == 1:
                continue
            for mid in range(start, end):
                split = diff(start, mid)
                if split == target / 2:
                    if max_sum < split:
                        max_sum = split
                    break
                elif split > target / 2:
                    break
    return max_sum
