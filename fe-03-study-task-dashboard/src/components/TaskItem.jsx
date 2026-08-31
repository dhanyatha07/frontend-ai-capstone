export function TaskItem({ task, onToggle, onDelete }) {
  const checkboxId = `task-${task.id}`;

  return (
    <li className={`task-item${task.completed ? " is-complete" : ""}`}>
      <input
        id={checkboxId}
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <label htmlFor={checkboxId} className="task-details">
        <span className="task-title">{task.title}</span>
        <span className="task-category">{task.category}</span>
      </label>
      <button
        type="button"
        className="btn-danger"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
      >
        Delete
      </button>
    </li>
  );
}
