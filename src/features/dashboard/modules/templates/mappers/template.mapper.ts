// src/features/dashboard/modules/templates/mappers/template.mapper.ts

import type { TemplateResponseDto, Template } from '../types/template.types'

/**
 * Formatea la complejidad para mostrar en la UI
 * SIMPLE → "Simple", MEDIUM → "Medium", COMPLEX → "Complex"
 */
function formatComplexity(complexity: string): string {
  return complexity.charAt(0).toUpperCase() + complexity.slice(1).toLowerCase()
}

/**
 * Transforma un TemplateResponseDto del backend a Template para la UI
 */
export function mapTemplateResponseToUI(dto: TemplateResponseDto): Template {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    category: dto.category,
    industry: dto.industry,
    complexity: formatComplexity(dto.complexity),
    content: dto.content,
    isPublic: dto.isPublic,
    usageCount: dto.usageCount,
    rating: dto.rating,
    creator: {
      name: dto.createdByName || dto.createdByEmail || 'Unknown',
      email: dto.createdByEmail || ''
    },
    lastUpdated: new Date(dto.updatedAt),
    createdAt: new Date(dto.createdAt)
  }
}

/**
 * Transforma un array de TemplateResponseDto a Template[]
 */
export function mapTemplateListToUI(dtos: TemplateResponseDto[]): Template[] {
  return dtos.map(mapTemplateResponseToUI)
}

/**
 * Transforma un Template de UI a CreateTemplateDto para enviar al backend
 */
export function mapUIToCreateDto(template: Partial<Template>): any {
  return {
    name: template.name,
    description: template.description,
    category: template.category,
    industry: template.industry,
    complexity: template.complexity?.toUpperCase(), // "Simple" → "SIMPLE"
    content: template.content || {},
    isPublic: template.isPublic ?? false
  }
}

/**
 * Transforma un Template de UI a UpdateTemplateDto para enviar al backend
 */
export function mapUIToUpdateDto(template: Partial<Template>): any {
  const dto: any = {}
  
  if (template.name !== undefined) dto.name = template.name
  if (template.description !== undefined) dto.description = template.description
  if (template.category !== undefined) dto.category = template.category
  if (template.industry !== undefined) dto.industry = template.industry
  if (template.complexity !== undefined) dto.complexity = template.complexity.toUpperCase()
  if (template.content !== undefined) dto.content = template.content
  if (template.isPublic !== undefined) dto.isPublic = template.isPublic
  
  return dto
}