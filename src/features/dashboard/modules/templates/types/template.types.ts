// src/features/dashboard/modules/templates/types/template.types.ts

export type TemplateComplexity = 'SIMPLE' | 'MEDIUM' | 'COMPLEX'
export type TemplateType = 'SIMPLE' | 'SCRUM' | 'KANBAN' | 'WATERFALL'

export interface TemplateResponseDto {
  id: string
  name: string
  description?: string
  category?: string
  industry?: string
  complexity: TemplateComplexity
  templateType: TemplateType // ✅ NUEVO CAMPO
  content: Record<string, any>
  isPublic: boolean
  usageCount: number
  rating?: number
  createdById: string
  createdByEmail?: string
  createdByName?: string
  createdAt: string
  updatedAt: string
}

export interface CreateTemplateDto {
  name: string
  description?: string
  category?: string
  industry?: string
  complexity?: TemplateComplexity
  templateType?: TemplateType // ✅ NUEVO CAMPO
  content: Record<string, any>
  isPublic?: boolean
}

export interface UpdateTemplateDto {
  name?: string
  description?: string
  category?: string
  industry?: string
  complexity?: TemplateComplexity
  templateType?: TemplateType // ✅ NUEVO CAMPO
  content?: Record<string, any>
  isPublic?: boolean
}

// Para la UI
export interface Template {
  id: string
  name: string
  description?: string
  category?: string
  industry?: string
  complexity: string
  templateType: TemplateType // ✅ NUEVO CAMPO
  content: Record<string, any>
  isPublic: boolean
  usageCount: number
  rating?: number
  creator: {
    name: string
    email: string
  }
  lastUpdated: Date
  createdAt: Date
}