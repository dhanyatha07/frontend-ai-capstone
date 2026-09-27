import { useState } from "react";

function CoachFeedback({ result }) {
  const [showStrongerHint, setShowStrongerHint] = useState(false);
  const [showApproach, setShowApproach] = useState(false);

  return (
    <section className="coach-feedback">
      <h2>AI Coach Feedback</h2>

      <p>{result.feedback}</p>

      <h3>Hint 1</h3>
      <p>{result.hint1}</p>

      <h3>Hint 2</h3>
      <p>{result.hint2}</p>

      {!showStrongerHint && (
        <button onClick={() => setShowStrongerHint(true)}>
          Show Stronger Hint
        </button>
      )}

      {showStrongerHint && (
        <>
          <h3>Stronger Hint</h3>
          <p>{result.strongerHint}</p>

          {!showApproach && (
            <button onClick={() => setShowApproach(true)}>Show Approach</button>
          )}
        </>
      )}

      {showApproach && (
        <>
          <h3>Approach</h3>
          <p>{result.approach}</p>

          <h3>Complexity</h3>
          <p>Time: {result.timeComplexity}</p>
          <p>Space: {result.spaceComplexity}</p>

          <h3>Next Step</h3>
          <p>{result.nextStep}</p>
        </>
      )}
    </section>
  );
}

export default CoachFeedback;
