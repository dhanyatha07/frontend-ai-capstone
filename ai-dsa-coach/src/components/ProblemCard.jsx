function ProblemCard({ problem, onSelect }) {
  return (
    <button className="problem-card" onClick={() => onSelect(problem)}>
      <h3>{problem.title}</h3>
      <p>{problem.topic}</p>
      <span>{problem.difficulty}</span>
    </button>
  );
}

export default ProblemCard;
