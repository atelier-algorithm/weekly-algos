// Runtime: 208 ms, faster than 100.00% of JavaScript online submissions for Sum of Absolute Differences in a Sorted Array.
// Memory Usage: 62.8 MB, less than 52.46% of JavaScript online submissions for Sum of Absolute Differences in a Sorted Array.

/**
 nums = [1, 4, 6, 8, 10]
 WHEN i = 2, x = 6
 SAD = (6-1) + (6-4) + (8-6) + (10-6)
     = (2*6) - (1+4) + (8+10) - (2*6)
     = (number of elements before) * x - (sum before x) + (sum after x) - (number of elements after) * x
     = i * x - (sum before x) + (sum after x) - (len(nums) - i - 1) * x
*/
const getSumAbsoluteDifferences = nums => {
  const { length } = nums;
  const differences = new Array(length);
  let sumBefore = 0;
  let sumAfter = 0;

  for (let i = 0; i < length; i += 1) {
    sumAfter += nums[i];
  }
  for (let i = 0; i < length; i += 1) {
    sumBefore += nums[i];
    sumAfter -= nums[i - 1] || 0;
    differences[i] = i * nums[i] - sumBefore + sumAfter - (length - i - 1) * nums[i];
  }

  return differences;
};

describe('sum-of-absolute-differences', () => {
  test.each`
    nums                | output
    ${[2, 3, 5]}        | ${[4, 3, 5]}
    ${[1, 4, 6, 8, 10]} | ${[24, 15, 13, 15, 21]}
  `('returns $output from $nums', ({ nums, output }) => {
    expect([...getSumAbsoluteDifferences(nums)]).toEqual(output);
  });
});
