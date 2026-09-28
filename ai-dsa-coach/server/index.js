import "dotenv/config";
import { z } from "zod";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import buildCoachPrompt from "./prompts/coachPrompt.js";
import problems from "../src/data/problems.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = "gemini-3.8-flash";

const coachResponseSchema = z.object({
  feedback: z.string(),
  hint1: z.string(),
  hint2: z.string(),
  strongerHint: z.string(),
  approach: z.string(),
  timeComplexity: z.string(),
  spaceComplexity: z.string(),
  nextStep: z.string(),
  readyForApproach: z.boolean(),
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/api/health", (req, res) => {
  res.json({
    message: "AI DSA Coach backend is running",
  });
});

async function generateCoachResponse(prompt) {
  const maxRetries = 3;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await ai.models.generateContent({
        model: MODEL,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              feedback: {
                type: "string",
              },
              hint1: {
                type: "string",
              },
              hint2: {
                type: "string",
              },
              strongerHint: {
                type: "string",
              },
              approach: {
                type: "string",
              },
              timeComplexity: {
                type: "string",
              },
              spaceComplexity: {
                type: "string",
              },
              nextStep: {
                type: "string",
              },
              readyForApproach: {
                type: "boolean",
              },
            },
            required: [
              "feedback",
              "hint1",
              "hint2",
              "strongerHint",
              "approach",
              "timeComplexity",
              "spaceComplexity",
              "nextStep",
              "readyForApproach",
            ],
          },
        },
      });
    } catch (error) {
      if (error.status === 429) {
        const quotaError = new Error(
          "AI Coach daily quota has been reached. Please try again later.",
        );
        quotaError.status = 429;
        throw quotaError;
      }
      if (error.status !== 503 || attempt === maxRetries - 1) {
        throw error;
      }

      const delay = 2000 * 2 ** attempt;

      console.log(`Gemini unavailable. Retrying in ${delay / 1000}s...`);

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

app.post("/api/analyze", async (req, res) => {
  const { problemId, attempt } = req.body;

  const problem = problems.find((item) => item.id === problemId);

  if (!problem) {
    return res.status(404).json({
      error: "Problem not found.",
    });
  }

  console.log("Problem:", problem.title);
  console.log("Attempt:", attempt);

  const prompt = buildCoachPrompt(problem, attempt);

  try {
    const response = await generateCoachResponse(prompt);

    const result = JSON.parse(response.text);
    const validatedResult = coachResponseSchema.parse(result);
    console.log("Gemini response:", validatedResult);

    res.json(validatedResult);
  } catch (error) {
    console.error("Gemini API error:", error);

    if (error.status === 429) {
      return res.status(429).json({
        error: error.message,
      });
    }

    if (error.status === 503) {
      return res.status(503).json({
        error:
          "AI Coach is temporarily unavailable. Please try again in a few minutes.",
      });
    }

    res.status(500).json({
      error: "Failed to analyze the attempt.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
