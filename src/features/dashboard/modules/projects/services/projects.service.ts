import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../../auth/services/axios.config'
import type { CreateProjectDto, ProjectResponse } from '../types.api'

// ============= API Functions =============
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

// ============= React Query Hooks =============

/**
 * Hook para obtener un proyecto con caché automático
 * Los datos se almacenan en caché por 5 minutos
 */
export function useProject(projectId: string | undefined) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProject(projectId!),
    enabled: !!projectId, // Solo ejecuta si projectId existe
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

/**
 * Hook para listar proyectos con caché
 */
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: listProjects,
    staleTime: 3 * 60 * 1000, // 3 minutos
  })
}

/**
 * Hook para crear un proyecto
 * Invalida el caché de la lista de proyectos automáticamente
 */
export function useCreateProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (dto: CreateProjectDto) => createProject(dto),
    onSuccess: () => {
      // Invalida y refresca la lista de proyectos
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

/**
 * Hook para agregar un miembro al proyecto
 * Invalida el caché del proyecto automáticamente
 */
export function useAddProjectMember(projectId: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (payload: { email: string; role?: string }) => 
      addProjectMember(projectId, payload),
    onSuccess: () => {
      // Invalida y refresca el caché del proyecto
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
    },
  })
}

/**
 * Hook para actualizar el rol de un miembro
 * Invalida el caché del proyecto automáticamente
 */
export function useUpdateProjectMemberRole(projectId: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ memberId, role }: { memberId: string; role: string }) => 
      updateProjectMemberRole(projectId, memberId, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
    },
  })
}

/**
 * Hook para eliminar un miembro del proyecto
 * Invalida el caché del proyecto automáticamente
 */
export function useRemoveProjectMember(projectId: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (memberId: string) => 
      removeProjectMember(projectId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
    },
  })
}
