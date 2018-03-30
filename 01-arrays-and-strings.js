'use strict';

/* 1. isUnique: Implement an algorithm to determine if a string  has all unique characters. What if you cannot use additional data structures? */
// Solution 1: with hash
const isUnique = str => {
  for (let i in str) {
    if (str[i]) return false;
    else str[i] = true;
  }
  return true;
};
// Solution 2: without using additional data structures
const isUnique2 = str => {
  for (let i in str) {
    for (let j in str) {
      if (i === j) continue;
      if (str[i] === str[j]) return false;
    }
  }
  return true;
};

/* 2. Check Permutations - Given two strings, write a method to decide if one is a permutation of the other. */
const isPermutation = (str1, str2) => {
  if (str1.length !== str2.length) return false;
  return str1.split('').sort().join('') === str2.split('').sort().join('');
};
// 2nd Try
const isPermutation2 = (str1, str2) => {
  if (str1.length !== str2.length) return false;
  let obj = {};
  for (let i in str1) {
    if (obj[str1[i]]) obj[str1[i]]++;
    else obj[str1[i]] = 1;
  }
  for (let i in str2) {
    if (obj[str2[i]]) {
      obj[str2[i]]--;
      if (obj[str2[i]] < 0) return false;
    }
    else return false;
  }
  return true;
};

/* 3. URLify - Write a method to replace all spaces in a string with '%20'. You may assume that the string has sufficient space at the end to hold the additional characters, and that you are given the "true" length of the string. */
const urlify = str => {
  let res = '';
  for (let i in str) {
    if (str[i] === ' ') res += '%20';
    else res += str[i];
  }
  return res;
};

/* 4. Palindrome Permutation: Given a string, write a function to check if it is a permuation of a palindrome. */
const isPermutationOfPalindrome = str => {
  let obj = {}, count = str.length, odd = 0;
  for (let i in str) {
    if (str[i] === ' ') count--;
    else if (obj[str[i].toLowerCase()]) obj[str[i].toLowerCase()]++;
    else obj[str[i].toLowerCase()] = 1;
  }
  for (let i in obj) {
    if (obj[i] % 2) odd++;
    if (odd > 1) return false;
  }
  return count % 2 === odd;
};

/* 5. One Away - Given two strings, write a function to check if they are one edit or zero edits away. Edits are: insert a character, remove a character, or replace a character. */
const oneEdit = (str1, str2) => {
  let diff = 0;
  if (str1.length === str2.length) {
    for (let i in str1) {
      if (str1[i] === str2[i]) continue;
      else diff++;
      if (diff > 1) return false;
    }
    return true;
  }
  else {
    let str1length = str1.length, str2length = str2.length;
    if (str1length > str2length + 1 || str1length < str2length -1) return false;
    let length = str1length > str2length ? str1length : str2length;
    let longest = str1length > str2length ? 'str1' : 'str2';
    for (let i = 0; i < length; i++) {
      if (str1[i] === str2[i]) continue;
      else if (longest === 'str1') str1 = str1.slice(0, i) + str1.slice(i + 1);
      else str2 = str2.slice(0, i) + str2.slice(i + 1);
      diff++;
      if (diff > 1) return false;
      length--;
    }
    return true;
  }
};

/* 6. Write a method that performs basic string compression using the counts of repeated characters. For example, the string aabcccccaaa would become a2b1c5a3. If the compressed string would not become smaller than the original string, return the original string. */
const stringCompression = str => {
  let res = str[0], count = 1;
  for (let i = 1; i < str.length; i++) {
    if (str[i] !== str[i - 1]) {
      res += count + str[i];
      count = 1;
    }
    else count ++;
  }
  res += count;
  return res.length < str.length ? res : str;
};

/* 7. Rotate Matrix - Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees. Can you do this in place? */
// Assuming img matrix is in the form of an array:
const rotateMatrix = img => {
  let res = [];
  for (let i in img) {
    res.push([]);
    for (let j in img) res[i].push(img[img.length - 1 - j][i]);
  }
  return res;
};

/* 8. Zero Matrix - Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0. */
const zeroMatrix = arr => {
  let res = arr.slice(), x = {}, y = {};
  for (let i in arr) {
    for (let j in arr[0]) {
      if (arr[i][j] === 0) {
        if (!y[i]) y[i] = true;
        if (!x[j]) x[j] = true;
      }
    }
  }
  for (let zero in x) {
    for (let i in res) res[i][zero] = 0;
  }
  for (let zero in y) {
    for (let i in res[0]) res[zero][i] = 0;
  }
  return res;
};

/* 9. String Rotation - Assume you have a method isSubstring which checks if one word is a substring of another. Given two strings, s1 and s2, write code to check if s2 is a rotation of s1 using only one call to isSubstring. */
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