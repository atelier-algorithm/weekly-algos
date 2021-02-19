/**
 * Runtime: 168 ms, faster than 25.32% of JavaScript online submissions.
 * Memory Usage: 46.9 MB, less than 15.02% of JavaScript online submissions.
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function(s, k) {
    let count = new Array(s.length)
    count[-1] = {} // 🤣🔫

    let idxmap = {} // 마지막으로 글자가 등장한 idx
    for (let i = 0; i < s.length; i++) {
        let target = s[i]
        count[i] = {}
        if (target in idxmap)
            count[i][target] = count[idxmap[target]][target] + 1
        else
            count[i][target] = 1
        idxmap[target] = i
    }

    let checkDiff = function(target, st, ed) {
        let lastIdx = (idx) => {
            // 여기에서는 idxmap을 사용할 수 없음
            for (; idx >= 0 && !(target in count[idx]); idx--);
            return idx
        }

        // memoize
        count[ed][target] = count[lastIdx(ed)][target] || 0
        count[st][target] = count[lastIdx(st)][target] || 0
        return count[ed][target] - count[st][target]
    }

    let max = 0
    for (let start = 0; start < s.length - max; start++) {
        let checklist = new Set(s.substr(start, max).split(''))
        let donelist  = new Set()

        endloop:
        for (let end = start + max; end < s.length; end++) {
            checklist.add(s[end])

            for (let c of checklist) {
                // 더 이상 c를 검사할 필요가 없음
                if (donelist.has(c)) continue

                // c에서 실패함
                if (checkDiff(c, start-1, end) < k) continue endloop

                // c에서 성공
                donelist.add(c)
            }

            if (end - start + 1 > max) max = end - start + 1
        }

        // 다른 글자가 나올 때까지 스킵한다
        while (start < s.length - k && s[start+1] == s[start]) start++
    }

    return max
};