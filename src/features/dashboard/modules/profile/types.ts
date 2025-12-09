export interface UserBasicInfo {
  id: string;
  email: string;
  completeName: string;
  avatar?: string;
  phone?: string;
  jobTitle?: string;
  location?: string;
  organization?: string;
  timezone: string;
  locale: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CurrentWorkItem {
  id: string;
  title: string;
  description: string;
  projectName: string;
  projectId: string;
  type: 'task_created' | 'task_completed' | 'comment_added';
}

export interface CompletedProject {
  id: string;
  name: string;
  description?: string;
  role: 'ADMIN' | 'MEMBER' | 'READER';
  status: 'COMPLETED';
  completedAt?: Date;
}

export interface UserProfile {
  user: UserBasicInfo;
  currentWork: CurrentWorkItem[];
  completedProjects: CompletedProject[];
}

export interface UpdateProfileRequest {
  jobTitle?: string;
  location?: string;
  organization?: string;
  phone?: string;
  avatar?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
