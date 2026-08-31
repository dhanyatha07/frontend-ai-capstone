export function TaskStats({ total, completed, pending }) {
  return (
    <section className="stats" aria-label="Task counts">
      <div className="stat-card">
        <p className="stat-label">Total</p>
        <p className="stat-value">{total}</p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Completed</p>
        <p className="stat-value">{completed}</p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Pending</p>
        <p className="stat-value">{pending}</p>
      </div>
    </section>
  );
}
