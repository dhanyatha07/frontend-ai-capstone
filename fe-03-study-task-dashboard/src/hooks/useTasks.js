import { useEffect, useState } from "react";
import { loadTasks, saveTasks } from "../utils/storage.js";

export function useTasks() {
  const [tasks, setTasks] = useState(loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function addTask(title, category) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || !/[A-Za-z0-9]/.test(trimmedTitle)) {
      return;
    }

    setTasks((current) => [
      {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        category,
        completed: false,
      },
      ...current,
    ]);
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return { tasks, addTask, toggleTask, deleteTask };
}
