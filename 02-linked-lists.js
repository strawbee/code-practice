'use strict';

class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next || null;
  }
}

module.exports = class SLL {
  constructor() {
    this.head = null;
  }

  insertHead(value) {
    this.head = new Node(value, this.head);
  }

  insertTail(value) {
    let node = new Node(value);
    if (!this.head) {
      this.head = node;
      return;
    }
    let current = this.head;
    while (current.next) current = current.next;
    current.next = node;
  }
};

/* 1. Remove Dupes - Write code to remove duplicates from an unsorted linked list. How would you solve this problem if a termporary buffer is not allowed? */
const removeDupes = list => {
  let vals = {}, current = list.head;
  vals[current.value] = true;
  while (current.next) {
    let prev = current;
    current = current.next;
    if (vals[current.value]) {
      prev.next = current.next;
      current = prev;
    }
    else vals[current.value] = true;
  }
  return list;
};

/* 2. Return Kth to Last - Implement an algorithm to find the kth to last element of a singly linked list. */
// if 1 > 2 > 3 > 4, 3rd to last is 2.
const kthToLast = (list, n) => {
  let current = list.head, count = 1;
  while (current.next) {
    current = current.next;
    count++;
  }
  let index = count - n;
  count = 0; 
  current = list.head;
  while (current.next) {
    if (index === count) return current;
    current = current.next;
    count++;
  }
  return null;
};

/* 3. Delete Middle Node - Implement an algorithm to delete a node in the middle (any node but first and last node, not necessarily exact middle) of a singly linked list, given only access to that node. */
// input is that node c. Output is a->b->d->e.
// I misread the problem domain but keeping it this way as deleting any node is pretty simple.
const deleteNode = (node, list) => {
  node.isNode = true;
  if (list.head.isNode) {
    list.head = list.head.next;
    return list.head;
  }
  let current = list.head;
  while (current.next) {
    let prev = current;
    current = current.next;
    if (current.isNode) {
      delete current.isNode;
      prev.next = current.next;
      return list.head;
    }
  }
  return null;
};

/* 4. Partition - Write code to partition a linked list around a value x, such that all nodes less than x come before all nodes greater than or equal to x. If x is contained within the list, the values of x only need to be after the elements less than x. The partition element x can appear anywhere in the "right partition"; it does not need to appear between the left and right partitions. */
// Input: 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1 (x = 5)
// Sample Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8
// My Output: 1 -> 2 -> 3 -> 5 -> 8 -> 5 -> 10
const partition = (list, x) => {
  let current = list.head;
  while (current.next) {
    let prev = current;
    current = current.next;
    if (current.value < x) {
      list.insertHead(current.value);
      prev.next = current.next;
      current = prev;
    }
  }
  return list;
};

/* 5. Sum Lists - You have two numbers represented by a linked list, where each node contains a single digit. The digits are stored in reverse order, such that the 1's digit is at the head of the list. Write a function that adds the two numbers and returns the sum as a linked list. */
// Input: (7 > 1 > 6) + (5 > 9 > 2). 617 + 295
// Output: 2 > 1 > 9. 912.
// Suppose the digits are stored in forward order. Repeat the above problem.
// Input: (6 > 1 > 7) + (2 > 9 > 5). 617 + 295.
// Output: 9 > 1 > 2. 912.
const sumLists = (l1, l2) => {
  let c1 = l1.head, c2 = l2.head, carry = false, res = new SLL(), num = 0;
  while (c1 || c2) {
    if (c1 && c2) num = c1.value + c2.value;
    else if (c1 && !c2) num = c1.value;
    else num = c2.value;
    if (carry) num += 1;
    if (num > 9) {
      num = num % 10;
      carry = true;
    }
    else carry = false;
    res.insertTail(num);
    c1 = c1.next;
    c2 = c2.next;
  }
  return res;
};

/* 6. Palindrome - Implement a function to check if a linked list is a palindrome. */
const isPalindrome = list => {
  let current = list.head, arr = [];
  while (current) {
    arr.push(current.value);
    current = current.next;
  }
  for (let i = 0; i < ~~(arr.length / 2); i++) {
    if (arr[i] !== arr[arr.length - 1 - i]) return false;
  }
  return true;
};

/* 7. Intersection - Given two singly linked lists, determine if the two lists intersect. Return the intersecting node. Intersection is defined based on reference, not value - if the kth node of the first linked list is the exact same node by reference as the jth node of the second linked list, they are intersecting. */
const intersectingLists = (l1, l2) => {
  let l1length = 0, l2length = 0, length, cur1 = l1.head, cur2 = l2.head, tail1, tail2;
  while (cur1 || cur2) {
    if (cur1) {
      l1length++;
      tail1 = cur1;
      cur1 = cur1.next;
    }
    if (cur2) {
      l2length++;
      tail2 = cur2;
      cur2 = cur2.next;
    }
  }
  if (tail1 !== tail2) return false;
  cur1 = l1.head, cur2 = l2.head;
  if (l1length > l2length) {
    length = l1length - l2length;
    for (let i = 0; i < length; i++) cur1 = cur1.next;
  }
  else if (l2length > l1length) {
    length = l2length - l1length;
    for (let i = 0; i < length; i++) cur2 = cur2.next;
  }
  while (cur1) {
    if (cur1 === cur2) return cur1;
    cur1 = cur1.next;
    cur2 = cur2.next;
  }
};

/* 8. Loop Detection - Given a circular linked list, implement an algorithm that returns the node at the beginning of the loop. */
const loopDetection = list => {
  let walker = list.head, runner = list.head;
  while (walker !== runner) {
    walker = walker.next;
    runner = runner.next.next;
  }
  if (runner === list.head) return runner;
  else runner = list.head;
  while (walker !== runner) {
    walker = walker.next;
    runner = runner.next;
  }
  return runner;
};