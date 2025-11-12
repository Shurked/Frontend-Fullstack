import api from '../../../../auth/services/axios.config'
import type { Task as TaskDTO } from '../panel/types'

export async function getTasks(projectId: string): Promise<TaskDTO[]> {
  const res = await api.get('/api/tasks', { params: { projectId } })
  const data = res.data?.data ?? res.data
  return data?.tasks ?? []
}

export async function getTaskById(id: string): Promise<TaskDTO | null> {
  const res = await api.get(`/api/tasks/${id}`)
  const data = res.data?.data ?? res.data
  return data?.task ?? null
}

export async function createTask(payload: { projectId: string; title: string; description?: string; priority?: string }) {
  const res = await api.post('/api/tasks', payload)
  const data = res.data?.data ?? res.data
  return data?.task ?? data
}

export async function updateTask(id: string, payload: Record<string, any>) {
  const res = await api.put(`/api/tasks/${id}`, payload)
  const data = res.data?.data ?? res.data
  return data?.task ?? data
}

export async function deleteTask(id: string) {
  const res = await api.delete(`/api/tasks/${id}`)
  return res.data
}

export default { getTasks, getTaskById, createTask, updateTask, deleteTask }
