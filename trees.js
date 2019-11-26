'use strict';
/** Trees: Problems from Cracking the Coding Interview, 6th Ed, by Gayle Laakmann McDowell. */

// =============================== TREE DATA STRUCTURE =============================== //
class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

module.exports = class BST {
  constructor(root = null) {
    this.root = root;
  }

  insert(value, node = this.root) {
    if (!node) this.root = new Node(value);
    else if (value > node.value) {
      if (node.right) this.insert(value, node.right);
      else node.right = new Node(value);
    }
    else {
      if (node.left) this.insert(value, node.left);
      else node.left = new Node(value);
    }
    return this;
  }

  find(value, node = this.root) {
    if (!node) return null;
    if (value === node.value) return node;
    else if (value > node.value) return this.find(value, node.right);
    else return this.find(value, node.left);
  }

  traverse(node = this.root, callback = nd => console.log(nd.value), order = 'in-order') {
    if (order === 'pre-order') callback(node);
    if (node.left) this.traverse(node.left, callback, order);
    if (order === 'in-order') callback(node);
    if (node.right) this.traverse(node.right, callback, order);
    if (order === 'post-order') callback(node);
  }

  breadthFirstTraversal(callback = nd => console.log(nd.value)) {
    let q = [this.root];
    while (q.length) {
      let node = q.shift();
      callback(node);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }

  remove(value, node = this.root, parent = null) {
    if (!value || !node) return null;
    if (value === node.value) return this._remove(node, parent);
    if (value < node.value) return this.remove(value, node.left, node);
    else return this.remove(value, node.right, node);
  }

  _remove(node, parent) {
    if (!node.left && !node.right) {
      if (!parent) this.root = null;
      if (node.value < parent.value) parent.left = null;
      else parent.right = null;
    }
    else if (node.left && !node.right) parent.left = node.left;
    else if (!node.left && node.right) parent.right = node.right;
    else if (node.left && node.right) node.value = this._delete(node.right, node);
    return this;
  }

  _delete(node, parent) {
    if (!node.left) {
      parent.right = node.right;
      return node.value;
    }
    else {
      let current = node.left;
      parent = node;
      while (current.left) {
        parent = current;
        current = current.left;
      }
      parent.left = null;
      return current.value;
    }
  }
};

// =============================== TREE QUESTIONS =============================== //

/* 2. Minimal Tree - Given a sorted (increasing order) array with unique integer elements, write an algorithm to create a binary search tree with minimal height. */
const minimalTree = arr => {
  let tree = {root: null};
  if (!arr.length) return tree;
  tree.root = new Node(arr[~~(arr.length / 2)]);
  _buildTree(arr, tree.root);
  return tree;
};

function _buildTree(arr, node) {
  let left = arr.slice(0, ~~(arr.length / 2));
  let right = arr.slice(~~(arr.length / 2) + 1);
  if (!left.length) return null;
  else {
    node.left = new Node(left[~~(left.length / 2)]);
    _buildTree(left, node.left);
  }
  if (!right.length) return null;
  else {
    node.right = new Node(right[~~(right.length / 2)]);
    _buildTree(right, node.right);
  }
}

/* 3. List of Depths - Given a binary tree, design an algorithm which creates a linked list of all the nodes at each depth (e.g., if you have a tree with depth D, you'll have D linked lists). */
const linkedListofDepths = tree => {
  if (!tree.root) return null;
  let obj = {};
  function _depths(node, level) {
    if (!obj[level]) obj[level] = [node.value];
    else obj[level].push(node.value);
    level++;
    if (node.right) _depths(node.right, level);
    if (node.left) _depths(node.left, level);
  }
  _depths(tree.root, 0);

  let res = [];
  for (let i in obj) {
    let list = { head: {} }, current = list.head;
    for (let j = 0; j < obj[i].length - 1; j++) {
      current.value = obj[i][j];
      current.next = {};
      current = current.next;
    }
    current.value = obj[i][obj[i].length - 1];
    current.next = null;
    res.push(list);
  }
  return res;
};

/* 4. Check Balanced - Implement a function to check if a binary tree is balanced. For the purposes of this question, a balanced tree is defined to be a tree such that the heights of the two subtrees of any node never differ by more than one. */
const isBalanced = tree => {
  if (!tree.root) return null;
  return _maxHeight(this.root) - _minHeight(this.root) <= 1;
};

function _maxHeight(node) {
  if (!node) return null;
  return 1 + Math.max(_maxHeight(node.left), _maxHeight(node.right));
}

function _minHeight(node) {
  if (!node) return null;
  return 1 + Math.min(_minHeight(node.left), _minHeight(node.right));
}

/* 5. Validate BST - Implement a function to check if a binary tree is a binary search tree. */
const isBST = tree => {
  const prev = -Infinity;

  function inOrderTraversal(node) {
    if (node.left) inOrderTraversal(node.left);
    if (node.value < prev) return false;
    else prev = node.value;
    if (node.right) inOrderTraversal(node.right);
    return true;
  }

  return inOrderTraversal(tree.root);
};

/* 6. Successor - Write an algorithm to find the "next" node (i.e., in-order successor) of a given node in a binary search tree. You may assume that each node has a link to its parent. */

/* 8. First Common Ancestor - Design an algorithm and write code to find the first common ancestor of two nodes in a binary tree. NOTE: This is not necessarily a binary search tree. */
const firstCommonAncestor = (tree, node1, node2) => {
  let leftTraverse, rightTraverse;

  function _traverseDaTree(node) {
    if (node === node1 || node === node2) return true;
    if (node.left) leftTraverse = _traverseDaTree(node.left);
    if (node.right) rightTraverse = _traverseDaTree(node.right);
    if (leftTraverse === true && rightTraverse === true) return node;
    if (typeof leftTraverse === 'object') return leftTraverse;
    else if (typeof rightTraverse === 'object') return rightTraverse;
    if (leftTraverse || rightTraverse) return true;
    return false;
  }

  return _traverseDaTree(tree.root);
};

/* 9. BST Sequences - A binary search tree was created by traversing through an array from left to right and inserting each element. Given a binary search tree with distinct elements, print all possible arrays that could have led to this tree.
Example Input:
  1
 / \
2   3
Output: [[1, 2, 3], [1, 3, 2]]
*/

/* 10. Check Subtree - T1 and T2 are two very large binary trees, with T1 much bigger than T2. Create an algorithm to determine if T2 is a subtree of T1.
A tree is a subtree of T1 if there exists a node n in T1 such that the subtree of n is identical to T2. That is, if you cut off the tree at node n, the two trees would be identical. */

/* 11. Random Node - You are implementing a binary tree class from scratch which, in addition to insert, find, and delete, has a method getRandomNode() which returns a random node from the tree. All nodes should be equally likely to be chosen. Design and implement an algorithm for getRandomNode, and explain how you would implement the rest of the methods. */

/* 12. Paths with Sum - You are given a binary tree in which each node contains an integer value (which might be positive or negative). Design an algorithm to count the number of paths that sum to a given value. The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes). */









/* Reconstruct binary tree from post order traversal

        10
        /\
       5 15
      /\  \
     3  6  19
     \     /\
      4   17 20

Post order is right, left, then node.
4, 3, 6, 5, 17, 20, 19, 15, 10

10 is the root
1st number bigger than 10 is the right child
first number smaller than 10 is the left child
Recursively calculate this for each node
*/

function reconstruct(arr) {
  const BST = new BST();
  BST.root = new Node(arr.pop());

  function buildChildren(arr, node) {
    if (!arr.length) return;
    let left = arr, right;

    // To optimize, use binary search instead
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > node.value) {
        left = arr.slice(0, i);
        right = arr.slice(i);
        break;
      }
    }

    if (left.length) {
      node.left = new Node(left.pop());
      buildChildren(left, node.left);
    }
    if (right.length) {
      node.right = new Node(right.pop());
      buildChildren(right, node.right);
    }
  }

  buildChildren(arr, BST.root);
  return BST;
}





/* BST Sum: Find all root to leaf nodes in a BST that sum to a given value.

Depth first traversal through BST with sum
When hit a leaf, if sum = n, return true. Else return false.
*/

function rootToLeafSum(root, n) {
  const results = [];
  _rootToLeafSumHelper(root, n, results)
  return results;
}

// Maybe store path as a string instead to avoid creating so many new arrays
function _rootToLeafSumHelper(node, n, results, current_sum = 0, path = []) {
  const new_path = path.slice();
  new_path.push(node.value);
  if (!node.left && !node.right) {
    if (n === current_sum) results.push(new_path);
  }
  if (node.left) _rootToLeafSumHelper(node.left, n, results, current_sum + node.value, new_path);
  if (node.right) _rootToLeafSumHelper(node.right, n, results, current_sum + node.value, new_path);
}



/*
Length of longest substring without repeated characters.

g e e k s f o r g e e k s


i: 8
char: g

max: 6
current: 6

last_index_map = {
  g: 0,
  e: 2,
  k: 3,
  s: 4,
  f: 5,
  o: 6,
  r: 7,
}

*/

function longestNonRepeatSubstring(str) {
  let max = 0, current = 0, start_idx = 0;
  let last_index_map = {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (last_index_map[char] === undefined || last_index_map[char] < start_idx) {
      current++;
    }
    else {
      current -= (i - last_index_map[char]);
      start_idx = last_index_map[char] + 1;
    }

    last_index_map[char] = i;
    max = Math.max(max, current);
  }
  return max;
}
longestNonRepeatSubstring('ABDEFGABEF');