# AI Development Prompts

## Prompt 1 — Project Setup and Architecture

> Build a small Study Task Dashboard using React and Vite. Keep the application beginner-friendly and use React state, props, and one custom hook where appropriate. The application should allow users to add tasks, select a category, mark tasks as completed, delete tasks, filter tasks by status and category, display task statistics, and persist tasks using localStorage.
>
> Use a component structure with App, Header, TaskStats, TaskForm, TaskFilters, TaskList, and TaskItem. Keep task state centralized and pass data and callbacks through props. Avoid Redux, Context, React Router, UI libraries, and unnecessary dependencies.

## Prompt 2 — Task State and Persistence

> Implement task state management using a custom useTasks hook. Store tasks in localStorage and load them when the application starts. Save the tasks whenever they change. Handle invalid JSON and unavailable localStorage safely so the application does not crash.

## Prompt 3 — Filtering and Statistics

> Add status and category filters to the Study Task Dashboard. The filters should support all, completed, and pending statuses, as well as all available task categories. Calculate total, completed, and pending counts from the complete task list rather than the filtered list.

## Prompt 4 — Responsive UI

> Create a clean, simple, responsive CSS layout for the Study Task Dashboard. It should work well on mobile and larger screens using CSS Grid/Flexbox and a small number of media queries. Keep the interface accessible with labels, keyboard focus styles, and appropriate ARIA attributes.

## Prompt 5 — Validation and Edge Cases

> Review the task form for validation and edge cases. Empty and whitespace-only task titles should be rejected. Also make sure titles containing only punctuation, such as "." or "!!!", are rejected while normal titles containing letters or numbers are accepted.

## Prompt 6 — Review and Testing

> Review the completed application and verify the main user flows: adding tasks, completing tasks, deleting tasks, filtering by status and category, displaying correct statistics, and persisting tasks after a page reload. Also check for build and lint errors.

---

# Manual Improvements and Corrections

The AI-generated implementation was reviewed manually and several issues were identified and corrected.

### 1. Punctuation-only task titles

The initial validation handled empty input but allowed values such as `"."` to be added as tasks.

I manually reviewed the validation logic and added a check requiring at least one letter or number:

```js
if (!/[A-Za-z0-9]/.test(trimmedTitle)) {
  setError("Title must include a letter or number.");
  return;
}
```

This prevents meaningless punctuation-only titles while still allowing normal task names.

### 2. Long task titles affecting the UI

I tested the application with a very long task title and noticed that the task layout could be affected.

I manually reviewed the task-item CSS and ensured that long titles wrap correctly using:

```css
.task-details {
  min-width: 0;
}

.task-title {
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
}
```

This keeps long task names inside the available layout instead of breaking the UI.

### 3. ESLint configuration issue

During development, the initial ESLint configuration caused an error because the installed React Hooks ESLint plugin version did not provide the configuration that was being referenced.

The configuration was reviewed and corrected to use the supported React Hooks configuration.

### 4. localStorage edge cases

The storage logic was reviewed to make sure invalid JSON or unavailable localStorage would not crash the application. The loading logic falls back to an empty task list when stored data cannot be used safely.

---

# How AI Assisted During Development

AI was used as a development assistant throughout the implementation. It helped with project scaffolding, component structure, React state management, localStorage persistence, filtering, responsive styling, validation, and debugging.

The generated code was not accepted without review. I tested the application manually, identified issues, and made corrections after observing the actual behavior of the application.

AI was mainly used to accelerate implementation and provide suggestions, while the final behavior was verified through manual testing and review.

---

# Verification

The completed application was tested for:

- Adding tasks
- Rejecting empty task titles
- Rejecting punctuation-only titles
- Selecting task categories
- Completing and uncompleting tasks
- Deleting tasks
- Filtering by status
- Filtering by category
- Correct task statistics
- localStorage persistence after reload
- Handling invalid localStorage data
- Long task title wrapping
- Responsive layout

The project was also checked with:

```bash
npm run lint
npm run build
```

Both checks passed.
