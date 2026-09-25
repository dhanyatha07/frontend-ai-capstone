import { analyzeComplexityTool } from "../tools/analyzeComplexity";

export async function chat(message: string) {
  const result = await analyzeComplexityTool.execute({
    algorithm: message,
  });

  return result;
}
