import React from 'react';

interface Task {
  id: number;
  title: string;
  project: string;
  priority: 'alta' | 'media' | 'baja';
  completed: boolean;
  dueDate: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return '#FF7452';
      case 'media': return '#FFAB00';
      case 'baja': return '#36B37E';
      default: return '#7A869A';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-[#F4F5F7] transition-colors">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-4 h-4 text-[#4931A9] bg-gray-100 border-gray-300 rounded focus:ring-[#4931A9] focus:ring-2"
        />
        <div>
          <h4 className={`font-medium ${task.completed ? 'line-through text-[#7A869A]' : 'text-[#172B4D]'}`}>
            {task.title}
          </h4>
          <p className="text-sm text-[#7A869A]">{task.project}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span
          className="px-2 py-1 rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        >
          {task.priority}
        </span>
        <span className="text-xs text-[#7A869A]">{task.dueDate}</span>
      </div>
    </div>
  );
};

export default TaskItem;