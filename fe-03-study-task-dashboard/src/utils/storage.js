import { CATEGORIES, STORAGE_KEY } from "../constants.js";

function isValidTask(item) {
  return (
    item !== null &&
    typeof item === "object" &&
    typeof item.id === "string" &&
    item.id.length > 0 &&
    typeof item.title === "string" &&
    CATEGORIES.includes(item.category) &&
    typeof item.completed === "boolean"
  );
}

export function loadTasks() {
  try {
    if (typeof localStorage === "undefined") {
      return [];
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidTask);
  } catch {
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    if (typeof localStorage === "undefined") {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Ignore quota or private-mode write failures.
  }
}
