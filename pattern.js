/**
 * Problem domain: For each iteration n, if the numbers on either side of the
 * element are the same, are the same, arr[i] becomes 0.
 * If different, arr[i] becomes 1. The elements at index -1 and 9 considered 0.
 * All changes for each iteration happen simultaneously.
 * Solution: For some reason, the pattern repeats every 14 iterations. I
 * have not figured out why.
 * @param {Array} arr of 0s and 1s
 * @param {Number} n of iterations
 */
function pattern(arr, n) {
  n = n % 14;

  while (n > 0) {
    const temp = arr.slice();

    for (let i = 0; i < arr.length; i++) {
      if (i === 0) temp[i] = arr[i + 1] === 0 ? 0 : 1;
      else if (i === arr.length - 1) temp[i] = arr[i - 1] === 0 ? 0 : 1;
      else temp[i] = arr[i - 1] === arr[i + 1] ? 0 : 1;
    }

    arr = temp.slice();
    n--;
  }

  return arr;
}

pattern([0, 0, 1, 1, 1, 0, 1, 0], 14);