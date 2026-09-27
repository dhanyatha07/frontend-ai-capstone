import { useState } from "react";

function AttemptInput({ problemId, onSubmit }) {
  const [attempt, setAttempt] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (attempt.trim() === "") {
      setError("please enter your approach or code first.");
      return;
    }
    setError("");
    onSubmit({
      problemId,
      attempt,
    });
  }

  return (
    <section className="attempt-input">
      <h3>Your Approach / Code</h3>

      <textarea
        value={attempt}
        onChange={(event) => setAttempt(event.target.value)}
        placeholder="Explain your approach or paste your code here..."
        rows="10"
      />
      {error && <p className="input-error">{error}</p>}

      <button type="button" onClick={handleSubmit}>
        Get Coaching
      </button>
    </section>
  );
}

export default AttemptInput;
