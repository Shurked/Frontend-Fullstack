import React from 'react';
import { Task } from './types';

interface TaskCardProps {
  task: Task;
  onTaskClick: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskClick }) => {
  const getPriorityColor = (priority?: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      case 'low':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div
      onClick={() => onTaskClick(task.id)}
      className="bg-white border border-[#DFE1E6] rounded-lg p-3 mb-3 hover:shadow-md transition-shadow cursor-pointer group"
    >
      {/* Título de la tarea */}
      <div className="flex items-start gap-2 mb-3">
        {task.priority && (
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority === 'high' && '⬆'}
            {task.priority === 'medium' && '➡'}
            {task.priority === 'low' && '⬇'}
          </span>
        )}
        <h4 className="text-[#172B4D] text-sm flex-1 group-hover:text-[#4931A9] transition-colors">
          {task.title}
        </h4>
      </div>

      {/* Assignee si existe */}
      {task.assignee && (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#4931A9] flex items-center justify-center text-white text-xs font-semibold">
            {task.assignee.initials}
          </div>
          <span className="text-[#7A869A] text-xs">{task.assignee.name}</span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
