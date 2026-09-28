import ProblemCard from "./ProblemCard";

function ProblemList({ problems, onSelect }) {
  return (
    <section className="problem-list">
      <h2>Choose a Problem</h2>

      {problems.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} onSelect={onSelect} />
      ))}
    </section>
  );
}

export default ProblemList;
