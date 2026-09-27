import ProblemCard from "./ProblemCard";

function ProblemList({ problems, onSelect }) {
  return (
    <section className="problem-list">
      {problems.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} onSelect={onSelect} />
      ))}
    </section>
  );
}

export default ProblemList;
