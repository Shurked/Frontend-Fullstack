import React, { useState } from 'react';
import { Task } from './types';

interface TaskCardProps {
  task: Task;
  onTaskClick: (taskId: string) => void;
  onEdit?: (taskId: string, columnId?: string) => void | Promise<void>;
  onDelete?: (taskId: string) => void | Promise<void>;
  columnId?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskClick, onEdit, onDelete, columnId }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  
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
    <div className="relative">
      <div
        draggable
        onDragStart={(e) => {
          setIsDragging(true)
          // Put task id and origin column in dataTransfer
          try {
            e.dataTransfer.setData('application/json', JSON.stringify({ taskId: task.id, fromColumnId: columnId }));
            e.dataTransfer.effectAllowed = 'move'
          } catch (err) {
            e.dataTransfer.setData('text/plain', task.id);
          }
        }}
        onDragEnd={() => {
          setIsDragging(false)
        }}
        onClick={() => onTaskClick(task.id)}
        className={`bg-white border border-[#DFE1E6] rounded-lg p-3 mb-3 hover:shadow-md transition-all cursor-move group ${
          isDragging ? 'opacity-50 rotate-2 scale-95' : ''
        }`}
      >
        {/* three dots menu top-right */}
        <button
          onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
          className="absolute right-2 top-2 text-[#7A869A] hover:text-[#172B4D] p-1"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <circle cx="5" cy="12" r="1.5" fill="currentColor" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <circle cx="19" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute right-2 top-8 z-20 bg-white border rounded shadow-md text-sm">
            <button onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onEdit?.(task.id, columnId); }} className="block w-full text-left px-3 py-2 hover:bg-gray-100">Editar</button>
            <button onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onDelete?.(task.id); }} className="block w-full text-left px-3 py-2 hover:bg-gray-100">Eliminar</button>
          </div>
        )}
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
        {/* Creator (who created the task) */}
        {task.creator && (
          <div className="flex items-center gap-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-[#4931A9] flex items-center justify-center text-white text-xs font-semibold">
              {task.creator.initials ?? task.creator.name.split(' ').map((n:string)=>n[0]).join('').toUpperCase().substring(0,2)}
            </div>
            <span className="text-[#7A869A] text-xs">{task.creator.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
