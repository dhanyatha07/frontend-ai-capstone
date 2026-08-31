import { useState } from "react";
import { CATEGORIES } from "../constants.js";

export function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Enter a task title.");
      return;
    }

    if (!/[A-Za-z0-9]/.test(trimmedTitle)) {
      setError("Title must include a letter or number.");
      return;
    }

    onAdd(title, category);
    setTitle("");
    setCategory(CATEGORIES[0]);
    setError("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="task-title">Task title</label>
        <input
          id="task-title"
          name="title"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            if (error) {
              setError("");
            }
          }}
          placeholder="e.g. Review binary search"
          autoComplete="off"
        />
        {error ? (
          <p className="field-error" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="task-category">Category</label>
        <select
          id="task-category"
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {CATEGORIES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-primary">
        Add task
      </button>
    </form>
  );
}
