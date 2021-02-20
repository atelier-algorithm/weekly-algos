// v2
// Runtime: 168 ms, faster than 70.51% of JavaScript online submissions for Flower Planting With No Adjacent.
// Memory Usage: 58.7 MB, less than 23.08% of JavaScript online submissions for Flower Planting With No Adjacent.
const gardenNoAdj = (n, paths) => {
  // build graph
  const graph = {};
  // add vertices
  for (let i = 0; i < n; i += 1) graph[i + 1] = [];
  // add bidirectional edges
  for (const [from, to] of paths) {
    graph[from].push(to);
    graph[to].push(from);
  }

  const answer = [];

  // for each garden...
  for (let garden = 1; garden <= n; garden += 1) {
    // list flowers planted nearby
    const nearby = {};
    for (const neighbor of graph[garden]) {
      const flower = answer[neighbor - 1];
      if (flower) nearby[flower] = true;
    }
    // find unused flower and assign it to the answer
    // 4 = maximum number of paths + 1
    for (let flower = 1; flower <= 4; flower += 1)
      if (!nearby[flower]) {
        answer[garden - 1] = flower;
        break;
      }
  }

  return answer;
};

/* v1
// Runtime: 196 ms, faster than 57.69% of JavaScript online submissions for Flower Planting With No Adjacent.
// Memory Usage: 59 MB, less than 17.95% of JavaScript online submissions for Flower Planting With No Adjacent.
const gardenNoAdj = (n, paths) => {
  // build graph
  const graph = {};
  // add vertices
  for (let i = 0; i < n; i += 1) graph[i + 1] = [];
  // add bidirectional edges
  for (const [from, to] of paths) {
    graph[from].push(to);
    graph[to].push(from);
  }

  const planted = { 1: true };
  const answer = [1];

  // for each garden...
  for (const garden in graph) {
    // skip if already planted
    if (planted[garden]) continue;
    // mark as planted
    planted[garden] = true;
    // grasp unused flower types
    const used = graph[garden].map(x => answer[x - 1]).filter(Boolean);
    // i = 🌼, 4 = maximum number of paths + 1
    for (let i = 1; i <= 4; i += 1)
      if (!used.includes(i)) {
        answer[garden - 1] = i;
        break;
      }
  }

  return answer;
};
*/

describe('flower-planting-with-no-adjacent', () => {
  test.each`
    n    | paths                                               | output
    ${3} | ${[[1, 2], [2, 3], [3, 1]]}                         | ${[1, 2, 3]}
    ${4} | ${[[1, 2], [3, 4]]}                                 | ${[1, 2, 1, 2]}
    ${4} | ${[[1, 2], [2, 3], [3, 4], [4, 1], [1, 3], [2, 4]]} | ${[1, 2, 3, 4]}
    ${5} | ${[[4, 1], [4, 2], [4, 3], [2, 5], [1, 2], [1, 5]]} | ${[1, 2, 1, 3, 3]}
    ${5} | ${[[3, 4], [4, 5], [3, 2], [5, 1], [1, 3], [4, 2]]} | ${[1, 1, 2, 3, 2]}
  `('returns $output from $input', ({ n, paths, output }) => {
    expect(gardenNoAdj(n, paths)).toEqual(output);
  });
});
