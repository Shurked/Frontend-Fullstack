import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Board, Task as UITask } from './types';
import type { Activity } from '../sumary/types';
import KanbanColumn from './KanbanColumn';
import AddColumnButton from './AddColumnButton';
import CreateTaskModal from './CreateTaskModal';
import EditTaskModal from './EditTaskModal';
import { deleteTask, updateTask, getTasks } from '../services/tasks.service';

// Datos mock del tablero
const mockBoardData: Board = {
  id: '1',
  projectId: '1',
  columns: [
    {
      id: 'todo',
      title: 'To Do',
      tasks: [],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        {
          id: 'task-1',
          title: 'Creación del inicio de sesión',
          assignee: {
            name: 'Juan Pérez',
            avatar: 'https://ui-avatars.com/api/?name=Juan+Perez&background=4931A9&color=fff',
            initials: 'D',
          },
        },
      ],
    },
    {
      id: 'in-review',
      title: 'In Review',
      tasks: [],
    },
    {
      id: 'done',
      title: 'Done',
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
  const [board, setBoard] = useState<Board>(mockBoardData);
  const [creatingColumnId, setCreatingColumnId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState<{ task: UITask; columnId: string } | null>(null);

  // Load tasks from backend when entering the board or when projectId changes
  useEffect(() => {
    if (!projectId) return;

    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const tasks = await getTasks(projectId);

        if (!mounted) return;

        // Map backend tasks to board columns by status
        // Build UI tasks and columns using mockBoardData as template (stable)
        const mappedBoard: Board = {
          ...mockBoardData,
          projectId: projectId,
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
                assignee: t.assignedTo ? { name: t.assignedTo.name ?? 'Asignado', avatar: t.assignedTo.avatar ?? '', initials: (t.assignedTo.initials ?? (t.assignedTo.name ? t.assignedTo.name.split(' ').map((n:string)=>n[0]).join('').toUpperCase().substring(0,2) : 'A')) } : undefined,
                creator: t.reportedBy ? { name: t.reportedBy.completeName ?? t.reportedBy.name ?? 'Desconocido', avatar: t.reportedBy.avatar ?? '', initials: t.reportedBy.initials ?? (t.reportedBy.completeName ? t.reportedBy.completeName.split(' ').map((n:string)=>n[0]).join('').toUpperCase().substring(0,2) : undefined) } : (t.creator ? { name: t.creator.name, avatar: t.creator.avatar ?? '', initials: t.creator.initials } : undefined)
              }))
          }))
        }

        setBoard(mappedBoard);

        // Notify parent about tasks list (flat)
        const flat: UITask[] = mappedBoard.columns.flatMap((c) => c.tasks);
        onTasksUpdated?.(flat);
      } catch (err) {
        console.error('Error fetching tasks for project', projectId, err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false }
  }, [projectId]);

  const handleTaskClick = (taskId: string) => {
    console.log('Task clicked:', taskId);
    // Aquí se implementaría la apertura del modal de detalle de tarea
  };
  const handleAddTask = (columnId: string) => {
    // Open create modal for this column
    setCreatingColumnId(columnId);
  };

  const handleCreateTask = (task: UITask, columnId: string) => {
    setBoard(prev => {
      const next = {
        ...prev,
        columns: prev.columns.map(c => c.id === columnId ? { ...c, tasks: [task, ...c.tasks] } : c)
      }
      onTasksUpdated?.(next.columns.flatMap(c => c.tasks))
      return next
    })
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
      await deleteTask(taskId)
      setBoard(prev => {
        const next = {
          ...prev,
          columns: prev.columns.map(c => ({ ...c, tasks: c.tasks.filter(t => t.id !== taskId) }))
        }
        onTasksUpdated?.(next.columns.flatMap(c => c.tasks))
        return next
      })
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
      // Update UI optimistically: remove old and insert into correct column
      setBoard(prev => {
        // remove old
        const withoutOld = prev.columns.map(c => ({ ...c, tasks: c.tasks.filter(t => t.id !== updatedTask.id) }))
        // insert in target column (based on updatedTask.status)
        const targetId = updatedTask.status ?? prev.columns[0].id
        const next = {
          ...prev,
          columns: withoutOld.map(c => c.id === targetId ? { ...c, tasks: [updatedTask, ...c.tasks] } : c)
        }
        onTasksUpdated?.(next.columns.flatMap(c => c.tasks))
        return next
      })
      // Persist to backend
      await updateTask(updatedTask.id, {
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
        priority: updatedTask.priority === 'medium' ? 'media' : updatedTask.priority,
      })
    } catch (err) {
      console.error('Error saving edited task', err)
      // On error, re-fetch tasks for the project to sync
      if (projectId) {
        try {
          const tasks = await getTasks(projectId)
          const mappedBoard: Board = {
            ...mockBoardData,
            projectId: projectId,
            columns: mockBoardData.columns.map(col => ({
              ...col,
              tasks: tasks.filter((t: any) => (t.status ?? 'todo') === col.id).map((t: any) => ({
                id: t.id,
                title: t.title ?? t.name ?? 'Sin título',
                description: t.description,
                status: t.status,
                priority: t.priority === 'media' ? 'medium' : (t.priority as any) || undefined,
                assignee: t.assignedTo ? { name: t.assignedTo.name ?? 'Asignado', avatar: t.assignedTo.avatar ?? '', initials: (t.assignedTo.initials ?? (t.assignedTo.name ? t.assignedTo.name.split(' ').map((n:string)=>n[0]).join('').toUpperCase().substring(0,2) : 'A')) } : undefined,
                creator: t.reportedBy ? { name: t.reportedBy.completeName ?? t.reportedBy.name ?? 'Desconocido', avatar: t.reportedBy.avatar ?? '', initials: t.reportedBy.initials ?? (t.reportedBy.completeName ? t.reportedBy.completeName.split(' ').map((n:string)=>n[0]).join('').toUpperCase().substring(0,2) : undefined) } : (t.creator ? { name: t.creator.name, avatar: t.creator.avatar ?? '', initials: t.creator.initials } : undefined)
              }))
            }))
          }
          setBoard(mappedBoard)
          onTasksUpdated?.(mappedBoard.columns.flatMap((c) => c.tasks))
        } catch (err2) {
          console.error('Error reloading tasks after edit failure', err2)
        }
      }
    } finally {
      setEditingTask(null)
    }
  }

  const handleMoveTask = async (taskId: string, fromColumnId: string | null, toColumnId: string) => {
    // Optimistic move in UI
    setBoard(prev => {
      let movingTask: UITask | undefined
      const newCols = prev.columns.map(c => {
        if (c.id === fromColumnId) {
          const filtered = c.tasks.filter(t => {
            if (t.id === taskId) {
              movingTask = t
              return false
            }
            return true
          })
          return { ...c, tasks: filtered }
        }
        return c
      })

      if (movingTask) {
        const next = {
          ...prev,
          columns: newCols.map(c => c.id === toColumnId ? { ...c, tasks: [movingTask!, ...c.tasks] } : c)
        }
        onTasksUpdated?.(next.columns.flatMap(c => c.tasks))
        return next
      }
      return prev
    })

    try {
      await updateTask(taskId, { status: toColumnId })
    } catch (err) {
      console.error('Move task backend error', err)
      // On error, revert by re-fetch or simple reload; for now, we will console and let user refresh
    }
  }

  const handleAddColumn = () => {
    console.log('Add new column');
    // Aquí se implementaría la lógica para agregar una nueva columna
  };

  return (
    <div className="h-full">
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
