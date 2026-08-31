# FE-03 Prompts

## Prompt 1 — Initial Planning

I want to build a small React application called "Study Task Dashboard" for my frontend AI engineering capstone.

Before writing any code:

1. Inspect the current repository structure.
2. Propose a simple React architecture and component structure.
3. List the files you recommend creating.
4. Explain briefly how state will flow between the components.
5. Do not create or modify any files yet.

The application should eventually support:

- Adding study tasks
- Task title and category
- Categories: DSA, Frontend, College
- Marking tasks complete/incomplete
- Deleting tasks
- Filtering tasks by status and category
- Showing total, completed, and pending task counts
- Persisting tasks using localStorage
- A simple responsive interface

Keep the implementation appropriate for a beginner/intermediate React learner. Avoid unnecessary libraries unless there is a strong reason to use them.

## Prompt 2 — Initial Implementation

Implement the Study Task Dashboard inside `fe-03-study-task-dashboard/`.

Use Vite + React with JavaScript.

Requirements:

- Create the Vite React application inside `fe-03-study-task-dashboard/`.
- Use functional React components and hooks.
- Keep task state centralized through a `useTasks` hook.
- Keep filter state in `App`.
- Use props and callback functions for child-to-parent interactions.
- Categories must be exactly: DSA, Frontend, College.
- Each task must have id, title, category, and completed fields.
- Add tasks through a controlled form.
- Prevent empty or whitespace-only task titles.
- Allow tasks to be marked complete/incomplete.
- Allow tasks to be deleted.
- Provide status filtering: All, Pending, Completed.
- Provide category filtering: All, DSA, Frontend, College.
- Display total, completed, and pending counts based on the complete task list.
- Persist tasks using localStorage.
- Handle malformed localStorage data safely without crashing.
- Use accessible labels and controls.
- Make the interface responsive using plain CSS.
- Do not add Redux, React Router, Context, form libraries, CSS frameworks, or unnecessary dependencies.

Before implementing, briefly explain the files you will create or modify.

After implementation:

1. Run the available checks/tests.
2. Verify that the app builds successfully.
3. Check the main user flows: add, complete, delete, filter, refresh/persistence.
4. Report any problems you find and fix them.
5. Do not modify README.md, CLAUDE.md, WORKFLOW.md, or files outside `fe-03-study-task-dashboard/`.

## Prompt 3 — Manual Review and Corrections

I manually reviewed the application and found two issues:

1. A task containing only punctuation, such as ".", is currently accepted. A study task should contain at least one letter or number. Keep the existing rejection of empty and whitespace-only titles, and also reject punctuation-only titles.

2. A very long task title causes the task UI/layout to expand or change undesirably. Long titles should wrap within the task item without breaking or overflowing the layout.

Please inspect the existing implementation and make the smallest appropriate changes to fix both issues.

Do not change unrelated functionality.
After making the changes:

1. Run npm run lint.
2. Run npm run build.
3. Verify that "." is rejected.
4. Verify that a normal title such as "Practice DSA" is accepted.
5. Verify that a very long title wraps without breaking the layout.

Explain exactly which files you changed and why.
