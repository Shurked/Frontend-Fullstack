// Tipos para el Dashboard "For You"

export interface UserStats {
  projectsCompleted: number;
  projectsInProgress: number;
  tasksCompleted: number;
  overdueTasks: number;
  teamMembers: number;
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
}

export interface ProjectWithStats {
  id: string;
  name: string;
  code?: string;
  description: string | null;
  status: string;
  type: string;
  taskStats: TaskStats;
  progress: number;
  memberCount: number;
  lastActivity: string | null;
}

export interface ProjectsResponse {
  projects: ProjectWithStats[];
  total: number;
}

export type ActivityType = 'task_created' | 'task_completed' | 'task_updated' | 'comment_added';

export interface Activity {
  type: ActivityType;
  timestamp: string;
  task: {
    id: string;
    title: string;
    description?: string;
    status?: string;
  };
  project: {
    id: string;
    name: string;
    code: string;
  };
  user: {
    id: string;
    name: string;
  };
  comment?: {
    id: string;
    content: string;
  };
}

export interface ActivitiesResponse {
  activities: Activity[];
  count: number;
}

export interface FavoriteBoard {
  id: string;
  projectId: string;
  projectName: string;
  projectCode: string;
  name: string;
  isFavorite: boolean;
  taskCount: number;
  lastAccessed: string;
}

export interface FavoriteBoardsResponse {
  boards: FavoriteBoard[];
  count: number;
}

export interface ToggleFavoriteResponse {
  isFavorite: boolean;
  message: string;
}

// Response genericas de la API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiError {
  success: false;
  error: {
    message: string;
    code?: string;
  };
}
