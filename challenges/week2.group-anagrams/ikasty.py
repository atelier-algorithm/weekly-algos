# Runtime: 88 ms, faster than 95.79% of Python3 online submissions
# Memory Usage: 17.9 MB, less than 50.18% of Python3 online submissions
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        result = defaultdict(list)
        for item in strs:
            result[''.join(sorted(item))].append(item)

        return result.values()