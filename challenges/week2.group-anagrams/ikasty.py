# Runtime: 5332 ms, faster than 5.06% of Python3 online submissions
# Memory Usage: 17.6 MB, less than 63.62% of Python3 online submissions
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        sorted_strs = [''.join(sorted(x)) for x in strs]
        result_list = []
        for item in set(sorted_strs):
            result = []
            for i in range(len(sorted_strs)):
                if sorted_strs[i] == item:
                    result.append(strs[i])
            result_list.append(result)
        return result_list