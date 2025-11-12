import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Board, Task as UITask } from './types';
import type { Activity } from '../sumary/types';
import KanbanColumn from './KanbanColumn';
import AddColumnButton from './AddColumnButton';
import CreateTaskModal from './CreateTaskModal';
import EditTaskModal from './EditTaskModal';
import { useTasks, useUpdateTask, useDeleteTask, useMoveTask } from '../services/tasks.service';

// Datos mock del tablero - Estados actualizados según el backend
const mockBoardData: Board = {
  id: '1',
  projectId: '1',
  columns: [
    {
      id: 'backlog',
      title: 'Backlog',
      tasks: [],
    },
    {
      id: 'todo',
      title: 'To Do',
      tasks: [],
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      tasks: [],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [],
    },
    {
      id: 'cancelled',
      title: 'Cancelled',
      tasks: [],
    },
  ],
};

interface BoardViewProps {
  onTaskCreated?: (activity: Activity) => void;
  onTasksUpdated?: (tasks: UITask[]) => void;
}

const BoardView: React.FC<BoardViewProps> = ({ onTaskCreated, onTasksUpdated }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [creatingColumnId, setCreatingColumnId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<{ task: UITask; columnId: string } | null>(null);

  // React Query hooks con caché automático
  const { data: tasksData, isLoading, isError } = useTasks(projectId);
  const updateTaskMutation = useUpdateTask(projectId!);
  const deleteTaskMutation = useDeleteTask(projectId!);
  const moveTaskMutation = useMoveTask(projectId!);

  // Mapear las tareas a las columnas del tablero
  const board: Board = useMemo(() => {
    const tasks = tasksData || [];
    
    return {
      ...mockBoardData,
      projectId: projectId || '1',
      columns: mockBoardData.columns.map(col => ({
        ...col,
        tasks: tasks
          .filter((t: any) => ((t.status ?? 'todo') as string) === col.id)
          .map((t: any) => ({
            id: t.id,
            title: t.title ?? t.name ?? 'Sin título',
            description: t.description,
            status: t.status,
            priority: t.priority === 'media' ? 'medium' : (t.priority as any) || undefined,
            assignee: t.assignedTo ? { 
              name: t.assignedTo.name ?? 'Asignado', 
              avatar: t.assignedTo.avatar ?? '', 
              initials: (t.assignedTo.initials ?? (t.assignedTo.name ? t.assignedTo.name.split(' ').map((n:string)=>n[0]).join('').toUpperCase().substring(0,2) : 'A')) 
            } : undefined,
            creator: t.reportedBy ? { 
              name: t.reportedBy.completeName ?? t.reportedBy.name ?? 'Desconocido', 
              avatar: t.reportedBy.avatar ?? '', 
              initials: t.reportedBy.initials ?? (t.reportedBy.completeName ? t.reportedBy.completeName.split(' ').map((n:string)=>n[0]).join('').toUpperCase().substring(0,2) : undefined) 
            } : (t.creator ? { 
              name: t.creator.name, 
              avatar: t.creator.avatar ?? '', 
              initials: t.creator.initials 
            } : undefined)
          }))
      }))
    };
  }, [tasksData, projectId]);

  // Notificar al padre cuando cambien las tareas (sin incluir onTasksUpdated en deps)
  useEffect(() => {
    if (tasksData && onTasksUpdated) {
      const flat: UITask[] = board.columns.flatMap((c) => c.tasks);
      onTasksUpdated(flat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksData, board]);

  const handleTaskClick = (taskId: string) => {
    console.log('Task clicked:', taskId);
    // Aquí se implementaría la apertura del modal de detalle de tarea
  };
  const handleAddTask = (columnId: string) => {
    // Open create modal for this column
    setCreatingColumnId(columnId);
  };

  const handleCreateTask = (task: UITask, columnId: string) => {
    // React Query invalidará el caché automáticamente
    // cuando se use el hook useCreateTask en CreateTaskModal
    
    // Notify parent (ProjectSummary) about the creation so it can add an activity
    try {
      const activity: Activity = {
        id: task.id,
        user: {
          name: task.creator?.name ?? 'Desconocido',
          avatar: task.creator?.avatar ?? '',
          initials: task.creator?.initials ?? (task.creator?.name ? task.creator.name.split(' ').map((n:string)=>n[0]).join('').toUpperCase().substring(0,2) : 'U'),
        },
        action: `creó la tarea \"${task.title}\"`,
        timestamp: new Date(),
        type: 'creation',
      }

      onTaskCreated?.(activity)
    } catch (err) {
      // ignore errors in activity creation
      console.error('activity notify error', err)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTaskMutation.mutateAsync(taskId)
    } catch (err) {
      console.error('Delete task error', err)
    }
  }
  
  const handleEditTask = (taskId: string, columnId?: string) => {
    // Find the task in the board and open edit modal
    const colId = columnId ?? board.columns.find(c => c.tasks.some(t => t.id === taskId))?.id
    if (!colId) return
    const task = board.columns.find(c => c.id === colId)?.tasks.find(t => t.id === taskId)
    if (!task) return
    setEditingTask({ task, columnId: colId })
  }

  const handleSaveEdit = async (updatedTask: UITask) => {
    try {
      await updateTaskMutation.mutateAsync({
        id: updatedTask.id,
        payload: {
          title: updatedTask.title,
          description: updatedTask.description,
          status: updatedTask.status,
          priority: updatedTask.priority === 'medium' ? 'media' : updatedTask.priority,
        }
      })
    } catch (err) {
      console.error('Error saving edited task', err)
    } finally {
      setEditingTask(null)
    }
  }

  const handleMoveTask = async (taskId: string, fromColumnId: string | null, toColumnId: string) => {
    // Validar que el estado de destino sea válido
    const validStatuses = ['backlog', 'todo', 'in_progress', 'done', 'cancelled'];
    if (!validStatuses.includes(toColumnId)) {
      console.error('Invalid status:', toColumnId);
      return;
    }

    try {
      // Actualización optimista: el UI se actualiza inmediatamente
      await moveTaskMutation.mutateAsync({
        taskId,
        newStatus: toColumnId
      })
    } catch (err) {
      console.error('Move task backend error', err)
      // El error se maneja automáticamente en useMoveTask (revertirá el cambio)
    }
  }

  const handleAddColumn = () => {
    console.log('Add new column');
    // Aquí se implementaría la lógica para agregar una nueva columna
  };

  // Estado de carga con skeleton
  if (isLoading) {
    return (
      <div className="h-full">
        <div className="flex items-center justify-end mb-3">
          <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-min">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-80 flex-shrink-0">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                  <div className="space-y-3">
                    {[1, 2].map((j) => (
                      <div key={j} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <div className="h-4 w-3/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                        <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Estado de error
  if (isError) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error al cargar las tareas</p>
          <p className="text-gray-500 text-sm">Por favor, intenta recargar la página</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      {/* Indicador de que se está moviendo una tarea */}
      {moveTaskMutation.isPending && (
        <div className="absolute top-0 right-0 z-50 mt-2 mr-2">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span className="text-sm">Moviendo tarea...</span>
          </div>
        </div>
      )}
      
      {/* Toolbar */}
      <div className="flex items-center justify-end mb-3">
        <button
          onClick={() => setCreatingColumnId(board.columns[0]?.id ?? null)}
          className="px-3 py-2 bg-[#4931A9] text-white rounded-md"
        >
          Crear tarea
        </button>
      </div>
      {/* Contenedor del tablero con scroll horizontal */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-min">
          {board.columns.map((column) => (
        <KanbanColumn
              key={column.id}
              column={column}
              onTaskClick={handleTaskClick}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
          onMoveTask={handleMoveTask}
            />
          ))}
          
          {/* Botón para agregar nueva columna */}
          <AddColumnButton onAddColumn={handleAddColumn} />
        </div>
      </div>
        {creatingColumnId && (
          <CreateTaskModal
            columnId={creatingColumnId}
            projectId={projectId ?? board.projectId}
            onClose={() => setCreatingColumnId(null)}
            onCreated={(task) => handleCreateTask(task, creatingColumnId ?? board.columns[0].id)}
          />
        )}
        {editingTask && (
          <EditTaskModal
            task={editingTask.task}
            projectId={projectId ?? board.projectId}
            onClose={() => setEditingTask(null)}
            onSaved={(task) => handleSaveEdit(task)}
          />
        )}
    </div>
  );
};

export default BoardView;
