/** My implementation of sort algorithms  */


// Helper function: swaps two elements of an array
function __swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/*
 * For each index, selection sort iterates through all the elements after that
 * index and finds the minimum one. If the minimum element is not at the index,
 * it swaps the minimum element and the element at the index.
 * Time complexity: worst and best case of O(n^2)
 * It will do the same checks regardless of the state of the input.
 * Space complexity: O(1)
 * Stable: No. It swaps the minimum element with whatever happens to be at the
 * index.
*/
const selectionSort = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        if (min_idx !== i) __swap(arr, i, min_idx);
    }
    return arr;
}

/**
 * Bubble sort iterates through each index of the array, swapping the element
 * at that index with the one after it if necessary to order the elements.
 * The last unsorted element becomes sorted after each iteration as it is the
 * largest element.
 * It keeps a counter of swaps; after one full iteration without a swap, the
 * sort is complete.
 * Time complexity: O(n^2) in the worst case. If the elements are completely
 * sorted, then it will be O(n) in the best case, as we break out of the loops.
 * Space complexity: O(1)
 * Stable: Yes. It only swaps the immediate next element if necessary.
 */
const bubbleSort = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let counter = 0;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        __swap(arr, j, j + 1);
        counter++;
      }
    }
    if (!counter) break;
  }
  return arr;
}

/*
 * Insertion sort inserts each element into place prior to the element's index.
 * All elements prior to the element's index are considered sorted.
 * Insertion sort is implemented by certain browsers for smaller sized arrays.
 * It's good in a situation where data is continuously being pushed into the
 * dataset.
 * Time complexity: O(n^2) in the worst case, if the data is sorted backwards.
 * O(n) in the best case if the data is already sorted because it skips the
 * j loops.
 * Space complexity: O(1)
 * Stable: Yes. Only swapping elements if larger; not swapping when equal.
 */
const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j;
    for (j = i - 1; j >= 0 && current < arr[j]; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = current;
  }
  return arr;
}


// Helper function: merges two arrays in sorted order
function __merge(arr1, arr2) {
  let sorted = [];
  let arr1_index = 0;
  let arr2_index = 0;

  while(arr1_index < arr1.length && arr2_index < arr2.length) {
    if(arr1[arr1_index] <= arr2[arr2_index]) {
      sorted.push(arr1[arr1_index]);
      arr1_index++;
    }
    else {
        sorted.push(arr2[arr2_index]);
        arr2_index++;
    }
  }

  if (arr1_index < arr1.length) {
    return sorted.concat(arr1.slice(arr1_index));
  }
  return sorted.concat(arr2.slice(arr2_index));
}

/**
 * Merge sort recursively halves the array until there is only one element,
 * then sorts the two elements in each recursive half.
 * Time complexity: O(n log n) because every element in the array is compared
 * log(n) times.
 * Space complexity: O(n) due to the auxilliary array needed to place the
 * sorted elements.
 * Stable: Yes, with the implementation of the merge helper that if the left
 * element is smaller or greater than the right element, merge the left element
 * first.
 */
const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;
    const mid = ~~(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return __merge(left, right);
}


// Helper function: Takes the first element of the array as the pivot, then
// sorts all elements smaller than the array to the left of the pivot, and
// all elements greater than the array to the right of the pivot. Returns
// the pivot index.
function __pivot(arr, start, end) {
    const pivot = arr[start];
    let pivot_index = start;

    for (let i = start; i <= end; i++) {
        if (pivot > arr[i]) {
            pivot_index++;
            __swap(arr, i, pivot_index);
        }
    }

    __swap(arr, start, pivot_index);

    return pivot_index;
}

/**
 * Quick sort designates one element as the pivot (in our case, the first) and
 * moves all elements smaller than the pivot to the left of it. It then
 * recursively does the same on the left and right sides of the pivot element.
 * Time complexity: O(n log n) in the average case
 * However O(n^2) in the worst case, if every item is already sorted;
 * Then there is ever only one side. This is why it's important to use
 * a truly shuffled starting array.
 * Space complexity: O(1) as the swaps happen in place
 * Stable: No. The pivot gets swapped with whatever is at the correct index.
 */
const quickSort = (arr, start = 0, end = arr.length - 1) => {
    if (start >= end) return arr;
    const idx = __pivot(arr, start, end);
    quickSort(arr, start, idx - 1);
    quickSort(arr, idx + 1, end);
    return arr;
}


// Helper function: gets the nth digit of a number. Returns 0 if the digit
// does not exist.
function __getDigit(num, n) {
    return ~~(Math.abs(num) / (10 ** n)) % 10;
}

// Helper function: Gets the number of digits in a number
function __getDigitCount(num) {
  let digits = 0;
  let n = 1;

  do {
    n = ~~(Math.abs(num) / (10 ** digits));
    digits++
  } while (n);

  return digits - 1;
}

// Get the highest number of digits out of a list of numbers
function __getMaxDigits(arr) {
  let max = 0;

  for (let i = 0; i < arr.length; i++) {
    max = Math.max(max, __getDigitCount(arr[i]));
  }

  return max;
}

/**
 * Radix sort is not a comparison sort - it does not directly compare whether
 * one element is greater than another. Radix sort works based on the idea that
 * the size of a number is encoded in the number of digits, thus only works
 * with sorting numerical elements.
 * It takes the value at each digit and sorts them, then put them back in the
 * array in digit sorted order.
 * Time complexity: Best, average, and worst of O(n * k) where k is the maximum
 * number of digits of an element.
 * Space complexity: O(n + k) because of bucket space.
 * Stable: Yes.
 */
const radixSort = (arr) => {
  const max_digits = __getMaxDigits(arr);

  for (let i = 0; i < max_digits; i++) {
    let buckets = Array.from({ length: 10 }, () => []);

    arr.forEach(num => {
      const digit = __getDigit(num, i);
      buckets[digit].push(num);
    });

    arr = [].concat(...buckets);
  }

  return arr;
}
