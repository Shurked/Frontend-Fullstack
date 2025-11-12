export type TemplateType = 'SCRUM' | 'KANBAN' | 'SIMPLE'

export interface CreateProjectDto {
  name: string
  description?: string
  code: string
  type?: TemplateType
}

export interface MemberResponse {
  id: string
  userId: string
  userEmail: string
  userCompleteName: string
  role: string
  addedAt: string
}

export interface TemplateDataResponse {
  id: string;
  name: string;
  description?: string;
  category?: string;
  industry?: string;
  complexity: string;
  content: Record<string, any>;
  templateType: string;
  isPublic: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectResponse {
  id: string
  name: string
  description?: string
  code: string
  status: string
  type: TemplateType
  createdById: string
  createdByEmail: string
  createdByName: string
  members: MemberResponse[]
  template?: TemplateDataResponse
  createdAt: string
  updatedAt: string
}
