// Runtime: 124 ms, faster than 88.53% of JavaScript online submissions for Group Anagrams.
// Memory Usage: 50.8 MB, less than 32.33% of JavaScript online submissions for Group Anagrams.

const groupAnagrams = strs => {
  // 해시테이블 생성 프로세스를 생략 가능할 경우 생략
  if (strs.length === 1) return [strs];
  // 해시테이블을 만들고 모든 value를 2차원 배열의 형태로 추출
  // key: 알파벳순으로 정렬된 아나그램
  // value: 해당 아나그램에 대응하는 모든 원소들의 배열
  return Object.values(
    strs.reduce((map, str) => {
      const key = [...str].sort().join('');
      if (!(key in map)) map[key] = [];
      map[key].push(str);
      return map;
    }, {})
  );
};

describe('group-anagrams', () => {
  test.each`
    input                                         | output
    ${['eat', 'tea', 'tan', 'ate', 'nat', 'bat']} | ${[['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']]}
    ${['']}                                       | ${[['']]}
    ${['a']}                                      | ${[['a']]}
  `('returns $output from $input', ({ input, output }) => {
    expect(groupAnagrams(input).map(arr => arr.sort())).toIncludeSameMembers(
      output.map(arr => arr.sort())
    );
  });
});
