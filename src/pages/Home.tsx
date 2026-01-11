import { useUser } from '../hooks/useUser';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import CustomPieChart from '../components/CustomPieChart';
import FavoriteTodos from '../components/FavoriteTodos';
import NewItems from '../components/NewItems';
import InProgressItems from '../components/InProgressItems';
import InfoCard from '../components/InfoCard';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import type { TodoFormData } from '../components/AddTodoForm';

const Home = () => {
  useUser(); 
  const navigate = useNavigate();

  const [todos, setTodos] = useState<TodoFormData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_TODOS);
      if (response.status === 200) {
        setTodos(response.data || []);
      }
    } catch (error: any) {
      console.error('Error fetching todos', error);
      toast.error(error?.response?.data?.message || 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (item: TodoFormData) => {
    if (!item.id) {
      toast.error('Invalid todo ID');
      return;
    }
    try {
      await axiosConfig.patch(API_ENDPOINTS.TOGGLE_FAVORITE(item.id), {
        isFavorite: !item.isFavorite,
      });
      toast.success(item.isFavorite ? 'Removed from favorites' : 'Added to favorites');
      fetchTodos();
    } catch (error: any) {
      console.error('Error toggling favorite', error);
      toast.error(error?.response?.data?.message || 'Failed to update favorite');
    }
  };

  const handleEditTodo = () => {
    navigate('/items');
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Dashboard activeMenu="Dashboard"> 
        <div className="my-5 mx-auto">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <InfoCard
              icon={<AlertCircle size={24} />}
              label="New Items"
              value={todos.filter((t) => t.status === "NEW").length}
              color="bg-purple-600"
              bgColor="bg-purple-50"
            />
            <InfoCard
              icon={<Clock size={24} />}
              label="In Progress"
              value={todos.filter((t) => t.status === "IN_PROGRESS").length}
              color="bg-orange-600"
              bgColor="bg-orange-50"
            />
            <InfoCard
              icon={<CheckCircle2 size={24} />}
              label="Completed"
              value={todos.filter((t) => t.status === "COMPLETED").length}
              color="bg-emerald-600"
              bgColor="bg-emerald-50"
            />
          </div>

          {/* Favorites and Custom Pie Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <FavoriteTodos 
              items={todos} 
              onToggleFavorite={handleToggleFavorite}
              onEditItem={handleEditTodo}
              onMore={() => navigate('/todo-items')}
            />
            <CustomPieChart 
              data={[
                { name: 'New', value: todos.filter((t) => t.status === "NEW").length },
                { name: 'In Progress', value: todos.filter((t) => t.status === "IN_PROGRESS").length },
                { name: 'Completed', value: todos.filter((t) => t.status === "COMPLETED").length },
              ]}
              label="Todo Distribution"
              colors={['#9333ea', '#ea580c', '#10b981']}
            />
          </div>

          {/* New Items and In Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <NewItems items={todos} onMore={() => navigate('/todo-items')} />
            <InProgressItems items={todos} onMore={() => navigate('/todo-items')} />
          </div>
        </div>
      </Dashboard> 
    </div>
  )
}

export default Home;