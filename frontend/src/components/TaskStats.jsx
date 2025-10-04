import { CheckCircle, Clock, AlertCircle, ListTodo } from 'lucide-react';

const TaskStats = ({ stats }) => {
  const getStatCount = (status) => {
    const stat = stats?.stats?.find((s) => s._id === status);
    return stat ? stat.count : 0;
  };

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats?.total || 0,
      icon: ListTodo,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      title: 'Completed',
      value: getStatCount('completed'),
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      title: 'In Progress',
      value: getStatCount('in-progress'),
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
    },
    {
      title: 'Pending',
      value: getStatCount('pending'),
      icon: AlertCircle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className={`${stat.bgColor} rounded-xl p-5 border border-gray-200 shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stat.textColor}`}>
                  {stat.title}
                </p>
                <p className={`text-3xl font-bold mt-2 ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskStats;
