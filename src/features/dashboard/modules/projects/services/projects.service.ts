import api from '../../../../auth/services/axios.config'
import type { CreateProjectDto, ProjectResponse } from '../types.api'

export async function listProjects(): Promise<ProjectResponse[] | any> {
  const res = await api.get('/api/projects')
  // backend may return { success, message, data } or plain array
  return res.data?.data ?? res.data
}

export async function createProject(dto: CreateProjectDto): Promise<ProjectResponse> {
  const res = await api.post('/api/projects', dto)
  // create returns wrapped object in many APIs
  return res.data?.data ?? res.data
}

export async function getProject(projectId: string): Promise<ProjectResponse> {
  const res = await api.get(`/api/projects/${projectId}`)
  return res.data?.data ?? res.data
}

export async function addProjectMember(projectId: string, payload: { email: string; role?: string }) {
  const res = await api.post(`/api/projects/${projectId}/members`, payload)
  return res.data
}

export async function updateProjectMemberRole(projectId: string, memberId: string, payload: { role: string }) {
  const res = await api.patch(`/api/projects/${projectId}/members/${memberId}`, payload)
  return res.data
}

export async function removeProjectMember(projectId: string, memberId: string) {
  const res = await api.delete(`/api/projects/${projectId}/members/${memberId}`)
  return res.data
}
