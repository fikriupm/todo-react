import { Pencil, ListTodo, Trash2, Star } from "lucide-react";
import type { TodoFormData } from "./AddTodoForm";

type ItemsListProps = {
  items: TodoFormData[];
  onEditItem: (item: TodoFormData) => void;
  onDeleteItem: (item: TodoFormData) => void;
  onStatusChange: (item: TodoFormData, newStatus: string) => void;
  onToggleFavorite: (item: TodoFormData) => void;
};

const statusOptions = [
  { value: "NEW", label: "New", color: "bg-purple-100 text-purple-800 border-purple-300" },
  { value: "IN_PROGRESS", label: "In Progress", color: "bg-orange-100 text-orange-800 border-orange-300" },
  { value: "COMPLETED", label: "Completed", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
];

const getStatusColor = (status: string) => {
  const option = statusOptions.find((opt) => opt.value === status);
  return option?.color || "bg-gray-100 text-gray-800 border-gray-200";
};

const ItemsList = ({ items, onEditItem, onDeleteItem, onStatusChange, onToggleFavorite }: ItemsListProps) => {
  const formatDate = (value?: string) => {
    if (!value) return "";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return "";
    return parsed.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="card p-5 bg-white shadow-sm rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Todo Items</h4>
      </div>

      {/* items list */}
      {items.length === 0 ? (
        <div className="text-center py-12">
          <ListTodo size={56} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">No todo items found</p>
          <p className="text-gray-400 text-sm mt-1">Add some to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              className={`group relative flex flex-col gap-3 p-4 rounded-xl border hover:shadow-md transition-all ${
                item.isFavorite ? "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300 shadow-sm" : "bg-white border-gray-200"
              }`}
            >
              {/* top section with icon and actions */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* icon display */}
                  <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                    {item.icon ? (
                      <img src={item.icon} alt={item.title} className="h-7 w-7" />
                    ) : (
                      <ListTodo className="text-primary text-green-800" size={28} />
                    )}
                  </div>
                  {/* item title and description */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-semibold">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                    <p className="text-[11px] text-gray-400 mt-2">
                      {formatDate((item as any).createdAt || (item as any).created_at) || "Date not available"}
                    </p>
                  </div>
                </div>
                
                {/* actions and status section */}
                <div className="flex items-center gap-2">
                  {/* favorite star - always visible */}
                  <button
                    onClick={() => onToggleFavorite(item)}
                    className="transition-colors p-1"
                    aria-label={`${item.isFavorite ? "Remove from" : "Add to"} favorites`}
                  >
                    <Star
                      size={18}
                      className={item.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400 hover:text-yellow-400"}
                    />
                  </button>

                  {/* status dropdown - always visible */}
                  <select
                    value={item.status}
                    onChange={(e) => onStatusChange(item, e.target.value)}
                    className={`text-xs font-semibold px-2 py-1 rounded-full border cursor-pointer transition-colors ${getStatusColor(item.status)}`}
                    aria-label={`Change status of ${item.title}`}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {/* action buttons - hidden by default, visible on hover */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEditItem(item)}
                      className="text-gray-400 hover:text-green-600 transition-colors p-1"
                      aria-label={`Edit ${item.title}`}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDeleteItem(item)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      aria-label={`Delete ${item.title}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemsList;
