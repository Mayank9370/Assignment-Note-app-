import { CreditCard as Edit2, Trash2, Calendar, AlertCircle } from 'lucide-react';

const TaskList = ({ tasks, onEdit, onDelete, loading }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">No tasks found</p>
        <p className="text-gray-500 text-sm mt-2">
          Create your first task to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900 flex-1 pr-2">
              {task.title}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(task)}
                className="text-blue-600 hover:text-blue-800 transition"
                title="Edit task"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="text-red-600 hover:text-red-800 transition"
                title="Delete task"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {task.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                task.status
              )}`}
            >
              {task.status}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </div>

          {task.dueDate && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Due: {formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
