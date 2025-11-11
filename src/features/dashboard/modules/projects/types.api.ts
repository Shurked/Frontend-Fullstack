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
  createdAt: string
  updatedAt: string
}
