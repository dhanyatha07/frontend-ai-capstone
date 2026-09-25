import { z } from "zod";

export const analyzeComplexitySchema = z.object({
  algorithm: z
    .string()
    .min(1)
    .describe("The name or description of the algorithm to analyze"),
});

export const analyzeComplexityTool = {
  description: "Analyzes the time and space complexity of a common algorithm.",
  inputSchema: analyzeComplexitySchema,

  execute: async ({ algorithm }: z.infer<typeof analyzeComplexitySchema>) => {
    const normalized = algorithm.toLowerCase();

    if (normalized.includes("binary search")) {
      return {
        algorithm: "Binary Search",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        explanation:
          "The search space is divided in half after each comparison.",
      };
    }

    if (normalized.includes("linear search")) {
      return {
        algorithm: "Linear Search",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "The elements may need to be checked one by one.",
      };
    }

    if (normalized.includes("merge sort")) {
      return {
        algorithm: "Merge Sort",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        explanation:
          "The array is divided recursively and the sorted halves are merged.",
      };
    }

    return {
      algorithm,
      timeComplexity: "Unknown",
      spaceComplexity: "Unknown",
      explanation:
        "This demo tool does not have a complexity rule for this algorithm yet.",
    };
  },
};
