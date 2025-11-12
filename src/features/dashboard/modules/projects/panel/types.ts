export interface Task {
  id: string;
  title: string;
  description?: string;
  status?: string;
  priority?: 'low' | 'medium' | 'high';
  assignee?: {
    name: string;
    avatar: string;
    initials: string;
  };
  // Creator (who reported/created the task)
  creator?: {
    name: string;
    avatar?: string;
    initials?: string;
  };
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color?: string;
}

export interface Board {
  id: string;
  projectId: string;
  columns: Column[];
}
