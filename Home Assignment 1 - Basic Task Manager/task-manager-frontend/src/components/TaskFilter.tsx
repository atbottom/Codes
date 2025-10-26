import React from 'react';

export type FilterType = 'all' | 'active' | 'completed';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    total: number;
    active: number;
    completed: number;
  };
}

const TaskFilter: React.FC<TaskFilterProps> = ({ currentFilter, onFilterChange, taskCounts }) => {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: taskCounts.total },
    { key: 'active', label: 'Active', count: taskCounts.active },
    { key: 'completed', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="btn-group mb-3" role="group">
      {filters.map((filter) => (
        <button
          key={filter.key}
          type="button"
          className={`btn ${currentFilter === filter.key ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
