import { useState } from "react";
import problems from "./data/problems";
import ProblemList from "./components/ProblemList";
import ProblemDetails from "./components/ProblemDetails";
import CoachFeedback from "./components/CoachFeedback";

function App() {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [coachResult, setCoachResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <main>
      <h1>AI DSA Coach</h1>
      <p>Practice DSA with an AI coach.</p>

      <ProblemList
        problems={problems}
        onSelect={(problem) => {
          setSelectedProblem(problem);
          setCoachResult(null);
          setError("");
        }}
      />

      {selectedProblem && (
        <ProblemDetails
          problem={selectedProblem}
          onSubmit={async (data) => {
            setLoading(true);
            setError("");
            setCoachResult(null);

            try {
              const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/analyze`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                },
              );

              const result = await response.json();

              if (!response.ok) {
                throw new Error(result.error || "Failed to get coaching.");
              }

              console.log("Coach response:", result);
              setCoachResult(result);
            } catch (error) {
              console.error("Failed to get coaching:", error);
              setError(error.message);
            } finally {
              setLoading(false);
            }
          }}
        />
      )}

      {loading && (
        <p className="coach-loading">AI Coach is analyzing your attempt...</p>
      )}

      {error && <p className="coach-error">{error}</p>}

      {coachResult && <CoachFeedback result={coachResult} />}
    </main>
  );
}

export default App;
