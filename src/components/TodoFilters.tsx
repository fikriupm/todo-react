import Input from "./Input";

type TodoFiltersProps = {
  keyword: string;
  statusFilter: string;
  onlyFavorites: boolean;
  dateFilter: string;
  onKeywordChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onToggleFavorites: (checked: boolean) => void;
  onDateChange: (value: string) => void;
};

const statusOptions = [
  { value: "", label: "All" },
  { value: "NEW", label: "New" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
];

const TodoFilters = ({
  keyword,
  statusFilter,
  onlyFavorites,
  dateFilter,
  onKeywordChange,
  onStatusChange,
  onToggleFavorites,
  onDateChange,
}: TodoFiltersProps) => {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm font-semibold text-slate-800">Filters</p>
          <p className="text-xs text-slate-500">Search, status, and favorites</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
          <Input
            label="Search"
            value={keyword}
            onChange={onKeywordChange}
            placeholder="Search title or description"
            type="text"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
          <Input
            label="Status"
            value={statusFilter}
            onChange={onStatusChange}
            isSelect
            options={statusOptions}
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
          <Input
            label="Date"
            value={dateFilter}
            onChange={onDateChange}
            type="date"
            placeholder="Filter by date"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow flex items-center">
          <label className="flex items-center gap-3 w-full">
            <input
              type="checkbox"
              checked={onlyFavorites}
              onChange={(e) => onToggleFavorites(e.target.checked)}
              className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-2 focus:ring-offset-1 focus:ring-amber-500"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">Show favorites only</span>
              <span className="text-xs text-gray-500">Keep the list focused on starred items</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TodoFilters;
