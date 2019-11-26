/** Linked Lists: Problems from Cracking the Coding Interview, 6th Ed, by Gayle Laakmann McDowell. */

'use strict';

class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class SLL {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Inserts list head with value
   * @param {*} value
   * @returns {SLL}
   */
  insertHead(value) {
    const node = new Node(value, this.head);
    this.head = node;
    if (!this.tail) this.tail = node;
    this.length++;
    return this;
  }

  /**
   * Inserts list tail with value
   * @param {*} value
   * @returns {SLL}
   */
  insertTail(value) {
    let node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }
    let current = this.head;
    while (current.next) current = current.next;
    current.next = node;
    this.tail = node;
    this.length++;
    return this;
  }

  /**
   * Traverses and performs callback on each node
   * @param {function} callback
   */
  traverse(callback) {
    if (!this.length) return null;

    let current = this.head;
    callback(current);
    while (current.next) {
      current = current.next;
      callback(current);
    }
  }

  /**
   * Removes duplicates from the list
   * @returns {SLL}
   */
  removeDuplicates() {
    if (!this.length) return null;

    const values = {}
    let current = this.head;
    values[current.value] = true;

    while (current.next) {
      const prev = current;
      current = current.next;
      if (values[current.value]) {
        prev.next = current.next;
        if (current === this.tail) this.tail = prev;
        current = prev;
        this.length--;
      }
      else values[current.value] = true;
    }

    return this;
  }

  /**
   * Given a node in the list, delete it from the list
   * @param {Node} node
   * @returns {SLL|null}
   */
  deleteNode(node) {
    if (!this.length) return null;

    let current = this.head;
    if (current === node) {
      this.head = current.next;
    }

    while (current.next) {
      const prev = current;
      current = current.next;

      if (current === node) {
        prev.next = current.next;
        this.length--;
        if (current === this.tail) this.tail = prev;
        return this;
      }
    }
    return null;
  }

  /**
   * Return the kth to last element.
   * 1 > 2 > 3 > 4. The 3rd to last is 2.
   * @param {Number} k
   * @return {Node|null}
   */
  findKthToLast(k) {
    let current = this.head;
    let idx = this.length - k;
    let current_idx = 0;

    while (current) {
      if (idx === current_idx) return current;
      current = current.next;
      current_idx++;
    }

    return null;
  }



};

/* Sum Lists - You have two numbers represented by a linked list, where each node
contains a single digit. The digits are stored in reverse order, such that the 1's digit
is at the head of the list. Write a function that adds the two numbers and returns the
sum as a linked list. */
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

/* Palindrome - Implement a function to check if a linked list is a palindrome. */
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

/* 7. Intersection - Given two singly linked lists, determine if the two lists intersect.
Return the intersecting node. Intersection is defined based on reference, not value - if the
kth node of the first linked list is the exact same node by reference as the jth node of the
second linked list, they are intersecting. */
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