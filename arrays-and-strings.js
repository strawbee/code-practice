/** Arrays and Strings: Problems from Cracking the Coding Interview, 6th Ed, by Gayle Laakmann McDowell. */

'use strict';

/* 1. isUnique: Implement an algorithm to determine if a string has all unique characters. What if you
cannot use additional data structures? */
// Solution 1: with hash
const isUnique = (str) => {
  const obj = {};
  for (let char of str) {
    if (obj[char]) return false;
    obj[char] = true;
  }
  return true;
};

// Solution 2: without using additional data structures
const isUnique2 = (str) => {
  for (let i in str) {
    for (let j in str) {
      if (i === j) continue;
      if (str[i] === str[j]) return false;
    }
  }
  return true;
};

/* 2. isPermutation - Given two strings, write a method to decide if one is a permutation of the other. */
// A permutation has the same characters the same number of times, in a different order
const isPermutation = (str1, str2) => {
  if (str1.length !== str2.length) return false;
  return str1.split('').sort().join('') === str2.split('').sort().join('');
};

const isPermutation2 = (str1, str2) => {
  if (str1.length !== str2.length) return false;
  const obj = {};
  for (let char of str1) obj[char] = obj[char] ? obj[char]++ : 1;
  for (let char of str2) {
    if (!obj[char] || obj[char]-- < 0) return false;
  }
  return true;
}


/* 3. URLify - Write a method to replace all spaces in a string with '%20'. You may assume that the string has
sufficient space at the end to hold the additional characters, and that you are given the "true" length of the string. */
const urlify = (str) => {
  let res = '';
  for (let char of str) {
    res += char === ' ' ? '%20' : char;
  }
  return res;
}

/* 4. Palindrome Permutation: Given a string, write a function to check if it is a permuation of a palindrome. */
// A permutation has the same letters the same number of times. A palindrome reads the same forwards and backwards.
// Each character should appear an even number of times. One character can be excepted if the string length is odd.
const isPermutationOfPalindrome = (str) => {
  const obj = {};
  let odd_char;

  for (let char of str) obj[char] = obj[char] ? --obj[char] : 1;

  for (let char of str) {
    if (obj[char]) {
      if (!(str.length % 2)) return false;
      if (!odd_char) odd_char = char;
      else if (odd_char !== char) return false;
    }
  }
  return true;
}

/* 5. One Away - Given two strings, write a function to check if they are one edit or zero edits away.
Edits are: insert a character, remove a character, or replace a character. */
const isOneEditAway = (str1, str2) => {
  if (str1 === str2) return true;
  if (Math.abs(str1.length - str2.length) > 1) return false;

  let diff = 0;

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      if (str1.length > str2.length) str1 = str1.slice(0, i) + str1.slice(i + 1);
      else if (str2.length > str1.length) str2 = str2.slice(0, i) + str2.slice(i + 1);
      if (++diff > 1) return false;
    }
  }

  return true;
}

/* 6. Write a method that performs basic string compression using the counts of repeated characters.
For example, the string aabcccccaaa would become a2b1c5a3. If the compressed string would not become
smaller than the original string, return the original string. */
const stringCompression = str => {
  let res = str[0], count = 1;
  for (let i = 1; i < str.length; i++) {
    if (str[i] !== str[i - 1]) {
      res += count + str[i];
      count = 1;
    }
    else count++;
  }
  res += count;
  return res.length < str.length ? res : str;
};

/* 7. Rotate Matrix - Given an image represented by an NxN matrix, where each pixel in the image
is 4 bytes, write a method to rotate the image by 90 degrees. Can you do this in place? */
// Assuming img matrix is in the form of an array:
const rotateMatrix = (arr) => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push([]);
    for (let j = 0; j < arr.length; j++) {
      res[i].push(arr[arr.length - 1 - j][i]);
    }
  }
  return res;
};

const rotateMatrixInPlace = (arr) => {
  const mid = ~~(arr.length/ 2);

  for (let i = 0; i < mid; i++) {
    for (let j = i; j < arr.length - 1 - i; j++) {
      const temp = arr[i][j];
      arr[i][j] = arr[arr.length - 1 - j][i];
      arr[arr.length - 1 - j][i] = arr[arr.length - 1 - i][arr.length - 1 - j];
      arr[arr.length - 1 - i][arr.length - 1 - j] = arr[j][arr.length - 1 - i]
      arr[j][arr.length - 1 - i] = temp;
    }
  }
  return arr;
}

/* 8. Zero Matrix - Write an algorithm such that if an element in an MxN matrix is 0, its entire
row and column are set to 0. */
const zeroMatrix = arr => {
  const x = {}, y = {};
  for (let i in arr) {
    for (let j in arr[0]) {
      if (arr[i][j] === 0) {
        y[i] = true;
        x[j] = true;
      }
    }
  }
  for (let key in x) {
    for (let i in arr) arr[i][key] = 0;
  }
  for (let key in y) {
    for (let i in arr[0]) arr[key][i] = 0;
  }
  return arr;
};

/* 9. String Rotation - Assume you have a method isSubstring which checks if one word is a
substring of another. Given two strings, s1 and s2, write code to check if s2 is a rotation of
s1 using only one call to isSubstring. */
const isSubstring = (s1, s2) => {
  if (s1.length !== s2.length) return false;
  for (let i in s1) {
    if (s1[i] === s2[0]) {
      let temp = s1.slice(i) + s1.slice(0, i);
      if (temp === s2) return true;
    }
  }
  return false;
};
// Try 2 based on book's suggestion
const isSubstring2 = (s1, s2) => {
  if (s1.length !== s2.length) return false;
  s1 = s1.concat(s1);
  if (s1.includes(s2)) return true;
  return false;
};



// Find the smallest value in a cyclic sorted array
const findSmallest = (arr) => {
  let start = 0, end = arr.length - 1, mid = ~~((start + end)/ 2);

  while (start < end) {
    if (mid < end) {
      end = mid;
    } else {
      start = mid;
    }
    mid = ~~((start + end) / 2);
  }

  return start;
}
