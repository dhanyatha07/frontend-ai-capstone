import "dotenv/config";
import express from "express";
import { chat } from "./api/chat";
import cors from "cors";
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const response = await chat(req.body.message);

    res.json({
      type: "output-available",
      data: response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      type: "output-error",
      error: "Tool execution failed.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
