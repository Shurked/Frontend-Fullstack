import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../../auth/services/axios.config'
import type { Task as TaskDTO } from '../panel/types'

// ============= API Functions =============
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

// ============= React Query Hooks =============

/**
 * Hook para obtener las tareas de un proyecto con caché automático
 * Los datos se almacenan en caché por 3 minutos
 */
export function useTasks(projectId: string | undefined) {
  return useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => getTasks(projectId!),
    enabled: !!projectId,
    staleTime: 3 * 60 * 1000, // 3 minutos
  })
}

/**
 * Hook para crear una tarea
 * Invalida el caché de tareas automáticamente
 */
export function useCreateTask(projectId: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (payload: { projectId: string; title: string; description?: string; priority?: string }) => 
      createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
    },
  })
}

/**
 * Hook para actualizar una tarea
 * Invalida el caché de tareas automáticamente
 */
export function useUpdateTask(projectId: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, any> }) => 
      updateTask(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
    },
  })
}

/**
 * Hook para mover una tarea entre columnas (drag and drop)
 * Actualiza el caché de forma optimista para UX instantánea
 */
export function useMoveTask(projectId: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ taskId, newStatus }: { taskId: string; newStatus: string }) => 
      updateTask(taskId, { status: newStatus }),
    
    // Actualización optimista: actualiza el UI inmediatamente
    onMutate: async ({ taskId, newStatus }) => {
      // Cancelar queries en progreso para evitar sobreescribir la actualización optimista
      await queryClient.cancelQueries({ queryKey: ['tasks', projectId] })
      
      // Snapshot del estado anterior
      const previousTasks = queryClient.getQueryData(['tasks', projectId])
      
      // Actualizar optimistamente el caché
      queryClient.setQueryData(['tasks', projectId], (old: any) => {
        if (!old || !Array.isArray(old)) return old
        
        return old.map((task: any) => 
          task.id === taskId 
            ? { ...task, status: newStatus }
            : task
        )
      })
      
      // Retornar contexto con el snapshot para poder revertir si falla
      return { previousTasks }
    },
    
    // Si la mutación falla, revertir al estado anterior
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks', projectId], context.previousTasks)
      }
      console.error('Error moving task:', err)
    },
    
    // Siempre refrescar después de éxito o error
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
    },
  })
}

/**
 * Hook para eliminar una tarea
 * Invalida el caché de tareas automáticamente
 */
export function useDeleteTask(projectId: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
    },
  })
}

export default { getTasks, getTaskById, createTask, updateTask, deleteTask }
