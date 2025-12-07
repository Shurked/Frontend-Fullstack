import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../auth/services/axios.config';
import type {
  ApiResponse,
  UserStats,
  ProjectsResponse,
  ActivitiesResponse,
  FavoriteBoardsResponse,
  ToggleFavoriteResponse,
} from './types';

// ============= API Functions =============

/**
 * Obtiene las estadísticas del usuario (tarjetas superiores)
 */
export async function getDashboardStats(): Promise<UserStats> {
  const response = await api.get<ApiResponse<UserStats>>('/api/dashboard/stats');
  return response.data.data;
}

/**
 * Obtiene los proyectos recientes del usuario
 */
export async function getRecentProjects(limit: number = 5, offset: number = 0): Promise<ProjectsResponse> {
  const response = await api.get<ApiResponse<ProjectsResponse>>('/api/projects/recent', {
    params: { limit, offset }
  });
  return response.data.data;
}

/**
 * Obtiene las actividades de hoy
 */
export async function getTodayActivities(date?: string): Promise<ActivitiesResponse> {
  const params = date ? { date } : {};
  const response = await api.get<ApiResponse<ActivitiesResponse>>('/api/dashboard/activities/today', {
    params
  });
  return response.data.data;
}

/**
 * Obtiene los tableros favoritos del usuario
 */
export async function getFavoriteBoards(): Promise<FavoriteBoardsResponse> {
  const response = await api.get<ApiResponse<FavoriteBoardsResponse>>('/api/boards');
  return response.data.data;
}

/**
 * Marca o desmarca un proyecto como favorito
 */
export async function toggleFavorite(projectId: string): Promise<ToggleFavoriteResponse> {
  const response = await api.post<ApiResponse<ToggleFavoriteResponse>>(`/api/boards/${projectId}/favorite`);
  return response.data.data;
}

// ============= React Query Hooks =============

/**
 * Hook para obtener estadísticas del dashboard
 * Se actualiza cada 5 minutos automáticamente
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
}

/**
 * Hook para obtener proyectos recientes
 */
export function useRecentProjects(limit: number = 5, offset: number = 0) {
  return useQuery({
    queryKey: ['recent-projects', limit, offset],
    queryFn: () => getRecentProjects(limit, offset),
    staleTime: 3 * 60 * 1000, // 3 minutos
  });
}

/**
 * Hook para obtener actividades de hoy
 * Se refresca automáticamente cada 30 segundos para ver actualizaciones en tiempo real
 */
export function useTodayActivities(date?: string) {
  return useQuery({
    queryKey: ['today-activities', date],
    queryFn: () => getTodayActivities(date),
    staleTime: 30 * 1000, // 30 segundos
    refetchInterval: 30 * 1000, // Refrescar cada 30 segundos
  });
}

/**
 * Hook para obtener tableros favoritos
 */
export function useFavoriteBoards() {
  return useQuery({
    queryKey: ['favorite-boards'],
    queryFn: getFavoriteBoards,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
}

/**
 * Hook para marcar/desmarcar favoritos
 * Invalida el caché de favoritos automáticamente
 */
export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => toggleFavorite(projectId),
    onSuccess: () => {
      // Invalidar caché de favoritos para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ['favorite-boards'] });
    },
  });
}
