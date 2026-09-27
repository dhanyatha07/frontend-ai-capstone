import AttemptInput from "./AttemptInput";

function ProblemDetails({ problem, onSubmit }) {
  return (
    <section className="problem-details">
      <h2>{problem.title}</h2>

      <p>{problem.description}</p>

      <h3>Constraints</h3>

      <ul>
        {problem.constraints.map((constraint, index) => (
          <li key={index}>{constraint}</li>
        ))}
      </ul>
      <AttemptInput problemId={problem.id} onSubmit={onSubmit} />
    </section>
  );
}

export default ProblemDetails;
