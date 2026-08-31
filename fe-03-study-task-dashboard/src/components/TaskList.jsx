import { TaskItem } from "./TaskItem.jsx";

export function TaskList({ tasks, hasTasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="empty-state" role="status">
        {hasTasks
          ? "No tasks match the current filters."
          : "No study tasks yet. Add one above."}
      </p>
    );
  }

  return (
    <ul className="task-list" aria-label="Study tasks">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
