# Runtime: 120 ms, faster than 29.53% of Python3 online submissions
# Memory Usage: 25 MB, less than 6.09% of Python3 online submissions
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        result_list = []
        hashmap = {}
        for item in strs:
            target = hashmap
            for c in sorted(item):
                if c not in target:
                    target[c] = {}
                target = target[c]

            if 0 not in target:
                target[0] = []
                result_list.append(target[0])
            target[0].append(item)

        return result_list