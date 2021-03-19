const getSumAbsoluteDifferences = nums => {
  const { length } = nums;
  const output = new Int32Array(length);
  for (let i = 0; i < length; i += 1) {
    for (let j = i + 1; j < length; j += 1) {
      const diff = nums[j] - nums[i];
      output[i] += diff;
      output[j] += diff;
    }
  }
  return output;
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
