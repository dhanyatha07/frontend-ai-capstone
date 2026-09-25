import { useState } from "react";

type ToolState =
  | "input-streaming"
  | "input-available"
  | "output-available"
  | "output-error";

type ResultData = {
  algorithm: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
};

function App() {
  const [algorithm, setAlgorithm] = useState("");
  const [status, setStatus] = useState<ToolState | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState("");

  const analyzeAlgorithm = async () => {
    setResult(null);
    setError("");

    if (!algorithm.trim()) {
      setStatus("output-error");
      setError("Please enter an algorithm to analyze.");
      return;
    }

    // State 1: input is being sent
    setStatus("input-streaming");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: algorithm }),
      });

      // State 2: input has reached the tool
      setStatus("input-available");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Tool execution failed.");
      }

      // State 3: tool returned a result
      if (data.type === "output-available") {
        setResult(data.data);
        setStatus("output-available");
      } else {
        throw new Error("Unexpected tool response.");
      }
    } catch (err) {
      // State 4: tool/request failed
      setStatus("output-error");

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while analyzing the algorithm.",
      );
    }
  };

  return (
    <main>
      <h1>AI DSA Coach</h1>
      <p>Analyze the complexity of an algorithm.</p>

      <input
        type="text"
        placeholder="e.g. binary search"
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
      />

      <button onClick={analyzeAlgorithm}>Analyze</button>

      {status === "input-streaming" && (
        <div>
          <h2>Analyzing...</h2>
          <p>Sending your algorithm to the complexity analysis tool.</p>
        </div>
      )}

      {status === "input-available" && (
        <div>
          <h2>Tool Input Received</h2>
          <p>
            The tool is analyzing: <strong>{algorithm}</strong>
          </p>
        </div>
      )}

      {status === "output-available" && result && (
        <div>
          <h2>Complexity Analysis</h2>

          <h3>{result.algorithm}</h3>

          <p>
            <strong>Time Complexity:</strong> {result.timeComplexity}
          </p>

          <p>
            <strong>Space Complexity:</strong> {result.spaceComplexity}
          </p>

          <p>{result.explanation}</p>
        </div>
      )}

      {status === "output-error" && (
        <div>
          <h2>Analysis Failed</h2>
          <p>{error}</p>
        </div>
      )}
    </main>
  );
}

export default App;
