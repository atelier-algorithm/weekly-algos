// Runtime: 4 ms, faster than 96.80% of C++ online submissions
// Memory Usage: 10.5 MB, less than 95.32% of C++ online submission
#include <algorithm>
#include <vector>

class Solution {
public:
    int bagOfTokensScore(std::vector<int>& tokens, int P) {
        std::sort(tokens.begin(), tokens.end());
        auto score = 0, max_score = 0;
        auto head = 0;
        auto tail = tokens.size();

        while (head != tail) {
            if (tokens[head] <= P) {
                P -= tokens[head++];
                score++;
            } else if (score > 0) {
                P += tokens[--tail];
                score--;
            }
            else break;

            if (score > max_score) max_score = score;
        }

        return max_score;
    }
};