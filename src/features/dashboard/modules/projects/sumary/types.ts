export interface ProjectDetails {
  id: string;
  name: string;
  type: string;
  lead: {
    name: string;
    avatar: string;
  };
  stats: {
    completed: number;
    updated: number;
    created: number;
    duesSoon: number;
  };
  statusBreakdown: {
    inProgress: number;
    inReview: number;
    toDo: number;
  };
  recentActivity: Activity[];
}

export interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  action: string;
  timestamp: Date;
  type: 'status_change' | 'creation' | 'update' | 'comment';
}

export type ProjectTab = 'summary' | 'board';
