# Runtime: 912 ms, faster than 92.39% of Python3 online submissions
# Memory Usage: 29.4 MB, less than 79.31% of Python3 online submissions
from itertools import accumulate

class Solution:
    def getSumAbsoluteDifferences(self, nums: List[int]) -> List[int]:
        n = len(nums)
        result = [0] * n
        result[0] = sum(nums) - nums[0] * n

        left_sum, right_sum = nums[0], sum(nums) - nums[0]
        for i in range(1, n):
            right_sum -= nums[i]
            # result  = right_sum - left_sum - nums[i] * (len(right) - len(left))
            result[i] = right_sum - left_sum - nums[i] * ((n-i - 1) - i)
            left_sum += nums[i]

        return result