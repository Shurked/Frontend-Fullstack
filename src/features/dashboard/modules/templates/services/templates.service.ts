// src/features/dashboard/modules/templates/services/templates.service.ts

import api from '../../../../auth/services/axios.config'
import type { 
  TemplateResponseDto, 
  CreateTemplateDto, 
  UpdateTemplateDto 
} from '../types/template.types'

/**
 * Lista todos los templates (propios + públicos si includePublic=true)
 * Backend: GET /api/templates?includePublic=true
 */
export async function listTemplates(includePublic: boolean = true): Promise<TemplateResponseDto[]> {
  const res = await api.get('/api/templates', {
    params: { includePublic }
  })
//  return res.data?.data ?? res.data
return res.data.data 
}

/**
 * Obtiene un template específico por ID
 * Backend: GET /api/templates/:templateId
 */
export async function getTemplate(templateId: string): Promise<TemplateResponseDto> {
  const res = await api.get(`/api/templates/${templateId}`)
  //return res.data?.data ?? res.data
  return res.data.data 
}

/**
 * Crea un nuevo template
 * Backend: POST /api/templates
 */
export async function createTemplate(dto: CreateTemplateDto): Promise<TemplateResponseDto> {
  const res = await api.post('/api/templates', dto)
  //return res.data?.data ?? res.data
  return res.data.data 
}

/**
 * Actualiza un template existente (solo el creador puede hacerlo)
 * Backend: PATCH /api/templates/:templateId
 */
export async function updateTemplate(
  templateId: string, 
  dto: UpdateTemplateDto
): Promise<TemplateResponseDto> {
  const res = await api.patch(`/api/templates/${templateId}`, dto)
  //return res.data?.data ?? res.data
  return res.data.data 
}

/**
 * Elimina un template (solo el creador puede hacerlo)
 * Backend: DELETE /api/templates/:templateId
 */
export async function deleteTemplate(templateId: string): Promise<void> {
  await api.delete(`/api/templates/${templateId}`)
}

/**
 * Busca templates con filtros opcionales
 * (Implementación futura si agregas endpoint de búsqueda)
 */
export async function searchTemplates(filters: {
  category?: string
  industry?: string
  complexity?: string
  minRating?: number
}): Promise<TemplateResponseDto[]> {
  const res = await api.get('/api/templates', { params: filters })
  //return res.data?.data ?? res.data
  return res.data.data 
}