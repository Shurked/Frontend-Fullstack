export interface Project {
  id: string;
  name: string;
  type: string;
  lead: {
    name: string;
    avatar: string;
  };
  isFavorite: boolean;
  lastUpdated: Date;
  description?: string;
  membersCount?: number;
}

export type ProjectFilter = 'all' | 'favorites' | 'recent' | 'archived';
