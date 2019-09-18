

/**
 * For each iteration n, if the numbers on either side are the same, i becomes 0.
 * If different, i becomes 1. index at -1 and 9 considered 0.
 * @param {Array} arr - length 8
 * @param {Number} n
 */
function houses(arr, n) {
    if (arr.length !== 8) return null;

    n = n % 14;

    while (n > 0) {
        const temp = arr.slice();

        for (let i = 0; i < arr.length; i++) {
            if (i === 0) temp[i] = arr[i + 1] === 0 ? 0 : 1;
            else if (i === 7) temp[i] = arr[i - 1] === 0 ? 0 : 1;
            else temp[i] = arr[i - 1] === arr[i + 1] ? 0 : 1;
        }

        arr = temp.slice();
        n--;
    }

    return arr;
}
houses([0, 0, 1, 1, 1, 0, 1, 0], 14);