import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { Plus } from "lucide-react";
import AddTodoForm, { type TodoFormData } from "../components/AddTodoForm";
import Modal from "../components/Modal";
import ItemsList from "../components/ItemsList";
import TodoFilters from "../components/TodoFilters";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";

const Items = () => {
  useUser();

  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<TodoFormData[]>([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoFormData | null>(null);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [dateFilter, setDateFilter] = useState("");

  const sortTodos = (data: TodoFormData[]) =>
    [...data].sort((a, b) => Number(b.isFavorite ?? false) - Number(a.isFavorite ?? false));

  const fetchTodos = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const url = onlyFavorites ? API_ENDPOINTS.GET_FAVORITES : API_ENDPOINTS.GET_TODOS;
      const response = await axiosConfig.get(url);
      if (response.status === 200) {
        let data: TodoFormData[] = response.data || [];

        if (statusFilter) {
          data = data.filter((t) => t.status === statusFilter);
        }

        if (dateFilter) {
          data = data.filter((t) => {
            const rawDate = (t as any).createdAt || (t as any).created_at;
            if (!rawDate) return false;
            const parsed = new Date(rawDate);
            if (Number.isNaN(parsed.getTime())) return false;
            return parsed.toISOString().slice(0, 10) === dateFilter;
          });
        }

        if (keyword.trim()) {
          const q = keyword.trim().toLowerCase();
          data = data.filter(
            (t) =>
              t.title.toLowerCase().includes(q) ||
              (t.description || "").toLowerCase().includes(q)
          );
        }

        setTodos(sortTodos(data));
      }
    } catch (error: any) {
      console.error("Error fetching todos", error);
      toast.error(error?.response?.data?.message || "Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, keyword, onlyFavorites, dateFilter]);

  const handleAddTodo = async (todo: TodoFormData) => {
    const { title, description, status, icon } = todo;
    if (!title.trim()) {
      toast.error("Todo title is required");
      return;
    }

    // check if the todo title already exists
    const isDuplicate = todos.some(
      (t) => t.title.toLowerCase() === title.toLowerCase()
    );

    if (isDuplicate) {
      toast.error("Todo title already exists");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_TODO, {
        title,
        description,
        status,
        icon,
      });
      if (response.status === 201) {
        toast.success("Todo added successfully");
        setOpenAddModal(false);
        fetchTodos();
      }
    } catch (error: any) {
      console.error("Error adding todo", error);
      toast.error(error?.response?.data?.message || "Failed to add todo");
    }
  };

  const handleEditTodo = (todoToEdit: TodoFormData) => {
    setSelectedTodo(todoToEdit);
    setOpenEditModal(true);
  };

  const handleUpdateTodo = async (updatedTodo: TodoFormData) => {
    const { id, title, description, status, icon } = updatedTodo;

    if (!title.trim()) {
      toast.error("Todo title is required");
      return;
    }

    if (!id) {
      toast.error("Invalid todo ID");
      return;
    }

    try {
      await axiosConfig.put(API_ENDPOINTS.UPDATE_TODO(id), {
        title,
        description,
        status,
        icon,
      });
      setOpenEditModal(false);
      setSelectedTodo(null);
      toast.success("Todo updated successfully");
      fetchTodos();
    } catch (error: any) {
      console.error("Error updating todo", error);
      toast.error(error?.response?.data?.message || "Failed to update todo");
    }
  };

  const handleStatusChange = async (item: TodoFormData, newStatus: string) => {
    if (!item.id) {
      toast.error("Invalid todo ID");
      return;
    }

    try {
      await axiosConfig.patch(API_ENDPOINTS.UPDATE_STATUS(item.id), {
        status: newStatus,
      });
      toast.success("Status updated successfully");
      fetchTodos();
    } catch (error: any) {
      console.error("Error updating status", error);
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const handleDeleteTodo = async (item: TodoFormData) => {
    if (!item.id) {
      toast.error("Invalid todo ID");
      return;
    }

    setSelectedTodo(item);
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedTodo?.id) return;

    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_TODO(selectedTodo.id));
      toast.success("Todo deleted successfully");
      setOpenDeleteModal(false);
      setSelectedTodo(null);
      fetchTodos();
    } catch (error: any) {
      console.error("Error deleting todo", error);
      toast.error(error?.response?.data?.message || "Failed to delete todo");
    }
  };

  const handleToggleFavorite = async (item: TodoFormData) => {
    if (!item.id) {
      toast.error("Invalid todo ID");
      return;
    }

    try {
      await axiosConfig.patch(API_ENDPOINTS.TOGGLE_FAVORITE(item.id), {
        isFavorite: !item.isFavorite,
      });
      toast.success(item.isFavorite ? "Removed from favorites" : "Added to favorites");
      fetchTodos();
    } catch (error: any) {
      console.error("Error toggling favorite", error);
      toast.error(error?.response?.data?.message || "Failed to update favorite");
    }
  };

  return (
    <Dashboard activeMenu="To Do">
      <div className="my-5 mx-auto">
        {/* add button to add todo */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Items</h2>
          <button
            onClick={() => setOpenAddModal(true)}
            className="add-btn flex items-center gap-1 bg-green-700 text-white px-3 py-2 rounded-lg"
          >
            <Plus size={16} />
            Add Item
          </button>
        </div>

        {/* stats cards */}
        {/* removed: now in Dashboard/Home */}

        {/* favorite items */}
        {/* removed: now in Dashboard/Home */}

        <TodoFilters
          keyword={keyword}
          statusFilter={statusFilter}
          onlyFavorites={onlyFavorites}
          dateFilter={dateFilter}
          onKeywordChange={setKeyword}
          onStatusChange={setStatusFilter}
          onToggleFavorites={setOnlyFavorites}
          onDateChange={setDateFilter}
        />

        {/* todo items list */}
        {loading ? (
          <p className="text-sm text-gray-600">Loading...</p>
        ) : (
          <ItemsList 
            items={todos} 
            onEditItem={handleEditTodo}
            onDeleteItem={handleDeleteTodo}
            onStatusChange={handleStatusChange}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* modals for add/edit todo */}
        <Modal
          isOpen={openAddModal}
          onClose={() => setOpenAddModal(false)}
          title="Add Todo Item"
        >
          <AddTodoForm onAddTodo={handleAddTodo} />
        </Modal>

        {/* update todo modal */}
        <Modal
          onClose={() => {
            setOpenEditModal(false);
            setSelectedTodo(null);
          }}
          isOpen={openEditModal}
          title="Update Todo Item"
        >
          <AddTodoForm
            initialTodoData={selectedTodo}
            onAddTodo={handleUpdateTodo}
            isEditing={true}
          />
        </Modal>

        {/* delete confirmation modal */}
        <Modal
          isOpen={openDeleteModal}
          onClose={() => {
            setOpenDeleteModal(false);
            setSelectedTodo(null);
          }}
          title="Delete Todo Item"
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              Are you sure you want to delete <span className="font-semibold">"{selectedTodo?.title}"</span>?
            </p>
            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setOpenDeleteModal(false);
                  setSelectedTodo(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Items;