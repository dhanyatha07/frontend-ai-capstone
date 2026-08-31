import { useState } from "react";
import { Header } from "./components/Header.jsx";
import { TaskFilters } from "./components/TaskFilters.jsx";
import { TaskForm } from "./components/TaskForm.jsx";
import { TaskList } from "./components/TaskList.jsx";
import { TaskStats } from "./components/TaskStats.jsx";
import { useTasks } from "./hooks/useTasks.js";

function filterTasks(tasks, statusFilter, categoryFilter) {
  return tasks.filter((task) => {
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.completed) ||
      (statusFilter === "pending" && !task.completed);

    const categoryMatch =
      categoryFilter === "all" || task.category === categoryFilter;

    return statusMatch && categoryMatch;
  });
}

export default function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const completed = tasks.filter((task) => task.completed).length;
  const stats = {
    total: tasks.length,
    completed,
    pending: tasks.length - completed,
  };

  const filteredTasks = filterTasks(tasks, statusFilter, categoryFilter);

  return (
    <div className="app">
      <Header />
      <main>
        <TaskStats
          total={stats.total}
          completed={stats.completed}
          pending={stats.pending}
        />
        <TaskForm onAdd={addTask} />
        <TaskFilters
          statusFilter={statusFilter}
          categoryFilter={categoryFilter}
          onStatusChange={setStatusFilter}
          onCategoryChange={setCategoryFilter}
        />
        <TaskList
          tasks={filteredTasks}
          hasTasks={tasks.length > 0}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
}
