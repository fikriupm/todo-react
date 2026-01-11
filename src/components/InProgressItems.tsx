import { Clock, ChevronRight, ArrowRight } from "lucide-react";
import type { TodoFormData } from "./AddTodoForm";

type InProgressItemsProps = {
  items: TodoFormData[];
  onMore: () => void;
};

const InProgressItems = ({ items, onMore }: InProgressItemsProps) => {
  const inProgressItems = items.filter((item) => item.status === "IN_PROGRESS");

  return (
    <div className="card p-5 bg-white shadow-sm rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={20} className="text-orange-600" />
          <h4 className="text-lg font-semibold">In Progress</h4>
        </div>
        <div className="flex items-center gap-2">
          {/* <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">
            {inProgressItems.length}
          </span> */}
          <button 
            className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium" 
            onClick={onMore}
          >
            View All <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {inProgressItems.length === 0 ? (
        <div className="text-center py-8">
          <Clock size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm">Nothing in progress!</p>
          <p className="text-gray-400 text-xs mt-1">Start working on some new items.</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
          {inProgressItems.slice(0, 10).map((item, index) => (
            <div
              key={item.id}
              className="group relative flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg hover:shadow-md hover:border-orange-300 transition-all cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Animated progress indicator */}
              <div className="absolute top-0 left-0 h-1 bg-orange-500 animate-pulse" style={{ width: '60%' }}></div>
              
              <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                <p className="text-xs text-gray-600 line-clamp-1">{item.description}</p>
              </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-orange-600 transition-colors flex-shrink-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InProgressItems;
