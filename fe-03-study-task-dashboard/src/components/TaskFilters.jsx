import { CATEGORIES, STATUS_FILTERS } from "../constants.js";

export function TaskFilters({
  statusFilter,
  categoryFilter,
  onStatusChange,
  onCategoryChange,
}) {
  return (
    <section className="filters" aria-label="Filter tasks">
      <div className="field">
        <label htmlFor="status-filter">Status</label>
        <select
          id="status-filter"
          name="status"
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          {STATUS_FILTERS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="category-filter">Category</label>
        <select
          id="category-filter"
          name="category"
          value={categoryFilter}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="all">All</option>
          {CATEGORIES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
