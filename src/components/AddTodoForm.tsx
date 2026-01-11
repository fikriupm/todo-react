import { useState, useEffect, useMemo } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

export type TodoFormData = {
  id?: string | number;
  title: string;
  description: string;
  status: "NEW" | "IN_PROGRESS" | "COMPLETED";
  icon?: string;
  isFavorite?: boolean;
  createdAt?: string;
};

type AddTodoFormProps = {
  onAddTodo: (todo: TodoFormData) => void | Promise<void>;
  initialTodoData?: TodoFormData | null;
  isEditing?: boolean;
};

const statusOptions = [
  { value: "NEW", label: "New" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
];

const AddTodoForm = ({ onAddTodo, initialTodoData = null, isEditing = false }: AddTodoFormProps) => {
  const [todo, setTodo] = useState<TodoFormData>({
    title: "",
    description: "",
    status: "NEW",
    icon: "",
    createdAt: new Date().toISOString().slice(0, 10),
  });
  const [loading, setLoading] = useState(false);

  const isPastDate = useMemo(() => {
    if (!todo.createdAt) return false;
    const selected = new Date(todo.createdAt);
    if (Number.isNaN(selected.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected < today;
  }, [todo.createdAt]);

  useEffect(() => {
    if (initialTodoData) {
      // Normalize date to YYYY-MM-DD for the date input
      const normalizedDate = initialTodoData.createdAt
        ? new Date(initialTodoData.createdAt).toISOString().slice(0, 10)
        : initialTodoData.createdAt;
      setTodo({ ...initialTodoData, createdAt: normalizedDate });
    }
  }, [initialTodoData]);

  const handleChange = (key: keyof TodoFormData, value: string) => {
    setTodo((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (isPastDate && todo.status === "NEW") {
      toast.error("For past dates, please set status to In Progress or Completed.");
      return;
    }

    setLoading(true);
    try {
      await onAddTodo(todo);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <EmojiPickerPopup
        icon={todo.icon}
        onSelect={(iconUrl) => handleChange("icon", iconUrl)}
      />
      <Input
        value={todo.title}
        onChange={(value) => handleChange("title", value)}
        label="Title"
        placeholder="e.g. Fix login bug"
        type="text"
      />

      <Input
        value={todo.description}
        onChange={(value) => handleChange("description", value)}
        label="Description"
        placeholder="Add details or steps"
        type="text"
      />

      <Input
        value={todo.createdAt || ""}
        onChange={(value) => handleChange("createdAt", value)}
        label="Date"
        placeholder="Select a date"
        type="date"
      />

      {(isEditing || isPastDate) && (
        <Input
          label="Status"
          value={todo.status}
          onChange={(value) => handleChange("status", value)}
          isSelect
          options={statusOptions}
        />
      )}

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="add-btn flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-60"
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              {isEditing ? "Updating..." : "Adding..."}
            </>
          ) : (
            isEditing ? "Update" : "Add"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddTodoForm;
