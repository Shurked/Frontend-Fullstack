import React, { useState } from 'react';
import { Column } from './types';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  column: Column;
  onTaskClick: (taskId: string) => void;
  onAddTask: (columnId: string) => void;
  onDeleteTask?: (taskId: string) => void | Promise<void>;
  onEditTask?: (taskId: string, columnId?: string) => void | Promise<void>;
  onMoveTask?: (taskId: string, fromColumnId: string | null, toColumnId: string) => void | Promise<void>;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  onTaskClick,
  onAddTask,
  onDeleteTask,
  onEditTask,
  onMoveTask,
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  
  return (
    <div
      className={`bg-[#F4F5F7] rounded-lg p-4 min-w-[280px] max-w-[320px] flex-shrink-0 group transition-all ${
        isDragOver ? 'ring-2 ring-[#4931A9] bg-[#EEF0F3]' : ''
      }`}
    >
      {/* Header de la columna */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-[#172B4D] font-semibold text-sm">{column.title}</h3>
          <span className="bg-[#DFE1E6] text-[#7A869A] text-xs font-medium px-2 py-0.5 rounded-full">
            {column.tasks.length}
          </span>
        </div>
        
        {/* Menú de opciones */}
        <button className="text-[#7A869A] hover:text-[#172B4D] p-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="1.5" fill="currentColor" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <circle cx="12" cy="19" r="1.5" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Lista de tareas */}
      <div
        className={`space-y-2 mb-3 max-h-[calc(100vh-280px)] overflow-y-auto transition-all ${
          isDragOver ? 'bg-white/50 rounded-lg p-2' : ''
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setIsDragOver(false)
        }}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragOver(false)
          try {
            const raw = e.dataTransfer.getData('application/json') || e.dataTransfer.getData('text/plain')
            const parsed = JSON.parse(raw)
            const { taskId, fromColumnId } = parsed
            if (taskId && taskId !== column.id) {
              onMoveTask?.(taskId, fromColumnId ?? null, column.id)
            }
          } catch (err) {
            // fallback: plain text id
            const id = e.dataTransfer.getData('text/plain')
            if (id) onMoveTask?.(id, null, column.id)
          }
        }}
      >
          {column.tasks.map((task) => (
            <TaskCard
              key={task.id}
              columnId={column.id}
              task={task}
              onTaskClick={onTaskClick}
              onDelete={(id) => onDeleteTask?.(id)}
              onEdit={(id) => onEditTask?.(id, column.id)}
            />
          ))}
        </div>

      {/* Botón agregar tarea */}
      <button
        onClick={() => onAddTask(column.id)}
        className="w-full py-2 px-3 rounded-lg text-[#7A869A] hover:bg-white hover:text-[#172B4D] transition-all flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100"
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Crear
      </button>
    </div>
  );
};

export default KanbanColumn;
