import { Star, ArrowRight } from "lucide-react";
import type { TodoFormData } from "./AddTodoForm";

type FavoriteTodosProps = {
  items: TodoFormData[];
  onToggleFavorite: (item: TodoFormData) => void;
  onEditItem: (item: TodoFormData) => void;
  onMore: () => void;
};

const getStatusBadge = (status: string) => {
  const badges = {
    NEW: <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-semibold">New</span>,
    IN_PROGRESS: <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full font-semibold">In Progress</span>,
    COMPLETED: <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-semibold">Completed</span>,
  };
  return badges[status as keyof typeof badges];
};

const FavoriteTodos = ({ items, onToggleFavorite, onEditItem, onMore }: FavoriteTodosProps) => {
  const favorites = items.filter((item) => item.isFavorite);

  return (
    <div className="card p-5 bg-white shadow-sm rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star size={20} className="text-yellow-500 fill-yellow-400" />
          <h4 className="text-lg font-semibold">Favorite Items</h4>
        </div>
        <div className="flex items-center gap-2">
          {/* <span className="text-sm px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-semibold">
            {favorites.length}
          </span> */}
          <button 
            className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium" 
            onClick={onMore}
          >
            View All <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-8">
          <Star size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm">No favorite items yet.</p>
          <p className="text-gray-400 text-xs mt-1">Click the star icon on any todo to add it here!</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="group flex items-start justify-between p-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg hover:shadow-md hover:border-amber-300 transition-all cursor-pointer"
              onClick={() => onEditItem(item)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                  {getStatusBadge(item.status)}
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(item);
                }}
                className="ml-3 text-yellow-400 hover:text-yellow-500 transition-transform hover:scale-110 flex-shrink-0"
                aria-label="Remove from favorites"
              >
                <Star size={18} className="fill-yellow-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteTodos;
