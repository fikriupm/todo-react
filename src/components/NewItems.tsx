import { AlertCircle, ChevronRight, ArrowRight } from "lucide-react";
import type { TodoFormData } from "./AddTodoForm";

type NewItemsProps = {
  items: TodoFormData[];
  onMore: () => void;
};

const NewItems = ({ items, onMore }: NewItemsProps) => {
  const newItems = items.filter((item) => item.status === "NEW");

  return (
    <div className="card p-5 bg-white shadow-sm rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertCircle size={20} className="text-purple-600" />
          <h4 className="text-lg font-semibold">New Items</h4>
        </div>
        <div className="flex items-center gap-2">
          {/* <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
            {newItems.length}
          </span> */}
          <button 
            className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium" 
            onClick={onMore}
          >
            View All <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {newItems.length === 0 ? (
        <div className="text-center py-8">
          <AlertCircle size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm">All caught up!</p>
          <p className="text-gray-400 text-xs mt-1">No new items at the moment.</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
          {newItems.slice(0, 10).map((item, index) => (
            <div
              key={item.id}
              className="group flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                <p className="text-xs text-gray-600 line-clamp-1">{item.description}</p>
              </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewItems;
