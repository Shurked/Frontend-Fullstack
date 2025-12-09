import { useQuery } from '@tanstack/react-query';
import api from '../../../auth/services/axios.config';
import type { CalendarResponse, CalendarQueryParams } from './types';

/**
 * Obtiene las tareas del calendario con filtros opcionales
 * @param params - Parámetros de consulta (startDate, endDate, filter)
 * @returns Promise con la respuesta del calendario
 */
export async function getCalendarTasks(params?: CalendarQueryParams): Promise<CalendarResponse> {
  const response = await api.get('/api/tasks/calendar', { params });
  return response.data;
}

/**
 * Hook de React Query para obtener tareas del calendario
 * Incluye caché automático y revalidación
 * @param params - Parámetros de consulta (startDate, endDate, filter)
 * @returns Query result con los datos del calendario
 */
export function useCalendarTasks(params?: CalendarQueryParams) {
  return useQuery({
    queryKey: ['calendar-tasks', params],
    queryFn: () => getCalendarTasks(params),
    staleTime: 2 * 60 * 1000, // 2 minutos de caché
    gcTime: 5 * 60 * 1000, // 5 minutos antes de eliminar del caché
  });
}
