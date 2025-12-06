// Tipos para el calendario de tareas

export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'done';

export type TaskPriority = 'baja' | 'media' | 'alta' | 'critica';

export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED' | 'ON_HOLD';

export type CalendarFilter = 'all' | 'creado' | 'asignado';

export interface CalendarTask {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assignedToId: string | null;
  reportedById: string | null;
  dueDate: string;
  estimatedHours: number | null;
  spentHours: number;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export interface CalendarProject {
  id: string;
  name: string;
  code: string;
  status: ProjectStatus;
}

export interface CalendarTaskItem {
  task: CalendarTask;
  project: CalendarProject;
}

export interface CalendarMeta {
  startDate: string;
  endDate: string;
  filter: CalendarFilter;
  count: number;
}

export interface CalendarResponse {
  success: boolean;
  data: {
    tasks: CalendarTaskItem[];
    meta: CalendarMeta;
  };
}

export interface CalendarQueryParams {
  startDate?: string;
  endDate?: string;
  filter?: CalendarFilter;
}
