import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Board } from './types';
import KanbanColumn from './KanbanColumn';
import AddColumnButton from './AddColumnButton';
import { useProject } from '../context/ProjectContext';

// Datos mock del tablero (fallback)
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

const BoardView: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [board, setBoard] = useState<Board>(mockBoardData);
  const { currentTemplate } = useProject();

  // Cuando template cambia, actualizar el tablero basado en el contenido de la template
  useEffect(() => {
    if (currentTemplate?.content?.workflows?.columns) {
      // Si la template tiene columnas definidas, usarlas
      const columns = currentTemplate.content.workflows.columns.map((col: any) => ({
        id: col.id || col.name?.toLowerCase().replace(/\s+/g, '-'),
        title: col.name,
        tasks: [],
      }));

      setBoard({
        id: projectId || '1',
        projectId: projectId || '1',
        columns,
      });
    } else if (currentTemplate?.templateType === 'KANBAN') {
      // Template Kanban por defecto
      setBoard({
        id: projectId || '1',
        projectId: projectId || '1',
        columns: [
          { id: 'todo', title: 'To Do', tasks: [] },
          { id: 'in-progress', title: 'In Progress', tasks: [] },
          { id: 'in-review', title: 'In Review', tasks: [] },
          { id: 'done', title: 'Done', tasks: [] },
        ],
      });
    } else if (currentTemplate?.templateType === 'SCRUM') {
      // Template Scrum por defecto
      setBoard({
        id: projectId || '1',
        projectId: projectId || '1',
        columns: [
          { id: 'backlog', title: 'Backlog', tasks: [] },
          { id: 'todo', title: 'To Do', tasks: [] },
          { id: 'in-progress', title: 'In Progress', tasks: [] },
          { id: 'in-review', title: 'In Review', tasks: [] },
          { id: 'done', title: 'Done', tasks: [] },
        ],
      });
    } else {
      // SIMPLE por defecto
      setBoard({
        id: projectId || '1',
        projectId: projectId || '1',
        columns: [
          { id: 'todo', title: 'To Do', tasks: [] },
          { id: 'done', title: 'Done', tasks: [] },
        ],
      });
    }
  }, [currentTemplate, projectId]);

  const handleTaskClick = (taskId: string) => {
    console.log('Task clicked:', taskId);
    // Aquí se implementaría la apertura del modal de detalle de tarea
  };

  const handleAddTask = (columnId: string) => {
    console.log('Add task to column:', columnId);
    // Aquí se implementaría la lógica para agregar una nueva tarea
  };

  const handleAddColumn = () => {
    console.log('Add new column');
    // Aquí se implementaría la lógica para agregar una nueva columna
  };

  return (
    <div className="h-full">
      {/* Contenedor del tablero con scroll horizontal */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-min">
          {board.columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onTaskClick={handleTaskClick}
              onAddTask={handleAddTask}
            />
          ))}
          
          {/* Botón para agregar nueva columna */}
          <AddColumnButton onAddColumn={handleAddColumn} />
        </div>
      </div>
    </div>
  );
};

export default BoardView;
