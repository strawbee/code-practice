// Helper swap function
const __swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/*
 * For each index, selection sort iterates through all the elements after that
 * index and finds the minimum one. If the minimum element is not at the index,
 * it swaps the minimum element and the element at the index.
 * Worst and best case time complexity: O(n^2)
 * It will do the same checks regardless of the state of the input.
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


/*
 * Insertion sort inserts each element into place prior to the element's index.
 * All elements prior to the element's index are considered sorted.
 * Insertion sort is implemented by certain browsers for smaller sized arrays.
 * It's good in a situation where data is continuously being pushed into the
 * dataset.
 * Time complexity: O(n^2) in the worst case, if the data is sorted backwards.
 * O(n) in the best case if the data is already sorted because it skips the
 * j loops.
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
