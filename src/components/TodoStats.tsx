import type { TodoFormData } from "./AddTodoForm";

type TodoStatsProps = {
  todos: TodoFormData[];
};

const TodoStats = ({ todos }: TodoStatsProps) => {
  const newCount = todos.filter((t) => t.status === "NEW").length;
  const inProgressCount = todos.filter((t) => t.status === "IN_PROGRESS").length;
  const completedCount = todos.filter((t) => t.status === "COMPLETED").length;

  const stats = [
    { label: "New", count: newCount, color: "bg-purple-50 border-purple-300 text-purple-700", icon: "🆕" },
    { label: "In Progress", count: inProgressCount, color: "bg-orange-50 border-orange-300 text-orange-700", icon: "🚀" },
    { label: "Completed", count: completedCount, color: "bg-emerald-50 border-emerald-300 text-emerald-700", icon: "✅" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
      {stats.map((stat) => (
        <div key={stat.label} className={`border-2 rounded-xl p-5 text-center ${stat.color} hover:shadow-md transition-shadow`}>
          <p className="text-lg mb-2">{stat.icon}</p>
          <p className="text-sm font-semibold mb-2">{stat.label}</p>
          <p className="text-4xl font-bold">{stat.count}</p>
        </div>
      ))}
    </div>
  );
};

export default TodoStats;
