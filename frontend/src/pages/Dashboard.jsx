import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import TaskStats from '../components/TaskStats';
import TaskFilters from '../components/TaskFilters';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModel';
import { taskAPI } from '../services/api';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const filterParams = {};
      if (filters.status) filterParams.status = filters.status;
      if (filters.priority) filterParams.priority = filters.priority;
      if (filters.search) filterParams.search = filters.search;

      const data = await taskAPI.getTasks(filterParams);
      setTasks(data);
      setError('');
    } catch (error) {
      setError(error.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await taskAPI.getTaskStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      setModalLoading(true);
      await taskAPI.createTask(taskData);
      setIsModalOpen(false);
      fetchTasks();
      fetchStats();
    } catch (error) {
      alert(error.message || 'Failed to create task');
    } finally {
      setModalLoading(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      setModalLoading(true);
      await taskAPI.updateTask(editingTask._id, taskData);
      setIsModalOpen(false);
      setEditingTask(null);
      fetchTasks();
      fetchStats();
    } catch (error) {
      alert(error.message || 'Failed to update task');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskAPI.deleteTask(taskId);
      fetchTasks();
      fetchStats();
    } catch (error) {
      alert(error.message || 'Failed to delete task');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearchChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <ProfileCard />
          </div>
          <div className="lg:col-span-2">
            <TaskStats stats={stats} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span className="font-semibold">New Task</span>
            </button>
          </div>

          <TaskFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
          />

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDeleteTask}
            loading={loading}
          />
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
        loading={modalLoading}
      />
    </div>
  );
};

export default Dashboard;
