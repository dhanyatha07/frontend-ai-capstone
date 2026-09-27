const problems = [
  {
    id: "two-sum",
    title: "Two Sum",
    topic: "Arrays / Hashing",
    difficulty: "Easy",
    description:
      "Given an array of integers and a target value, find two numbers whose sum equals the target.",
    constraints: [
      "Each input has exactly one solution.",
      "You may not use the same element twice.",
    ],
    expectedConcepts: ["HashMap", "One-pass traversal"],
  },

  {
    id: "binary-search",
    title: "Binary Search",
    topic: "Binary Search",
    difficulty: "Easy",
    description:
      "Given a sorted array of integers and a target value, find the index of the target using binary search.",
    constraints: [
      "The array is sorted in ascending order.",
      "If the target does not exist, return -1.",
    ],
    expectedConcepts: ["Binary Search", "Divide the search space"],
  },

  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    topic: "Stack",
    difficulty: "Easy",
    description:
      "Given a string containing brackets, determine whether every opening bracket has a matching closing bracket in the correct order.",
    constraints: [
      "The string contains only parentheses, brackets, and braces.",
      "Every closing bracket must match the most recent unmatched opening bracket.",
    ],
    expectedConcepts: ["Stack", "LIFO", "Bracket matching"],
  },

  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    topic: "Arrays",
    difficulty: "Medium",
    description:
      "Given an integer array, find the contiguous subarray with the largest sum.",
    constraints: [
      "The subarray must contain at least one element.",
      "The subarray must contain contiguous elements.",
    ],
    expectedConcepts: ["Kadane's Algorithm", "Dynamic Programming"],
  },

  {
    id: "merge-sort",
    title: "Merge Sort",
    topic: "Sorting / Divide & Conquer",
    difficulty: "Medium",
    description:
      "Given an unsorted array of integers, sort the array using the merge sort algorithm.",
    constraints: [
      "The array may contain positive, negative, and duplicate values.",
      "The solution should use the divide-and-conquer approach.",
    ],
    expectedConcepts: ["Divide and Conquer", "Recursion", "Merging"],
  },

  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    topic: "Linked List",
    difficulty: "Easy",
    description:
      "Given the head of a singly linked list, reverse the list and return the new head.",
    constraints: [
      "The list may be empty.",
      "The list contains nodes connected through next references.",
    ],
    expectedConcepts: ["Linked List", "Pointers", "Iteration"],
  },
];
export default problems;
