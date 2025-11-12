// src/features/dashboard/modules/templates/types/template.types.ts

// ============================================
// TIPOS DEL BACKEND (según tu API)
// ============================================
export type TemplateComplexity = 'SIMPLE' | 'MEDIUM' | 'COMPLEX'

export interface TemplateResponseDto {
  id: string
  name: string
  description?: string
  category?: string
  industry?: string
  complexity: TemplateComplexity
  content: Record<string, any> // Estructura JSON de fases/tareas
  isPublic: boolean
  usageCount: number
  rating?: number
  createdById: string
  createdByEmail?: string
  createdByName?: string
  createdAt: string // ISO date
  updatedAt: string // ISO date
}

export interface CreateTemplateDto {
  name: string
  description?: string
  category?: string
  industry?: string
  complexity?: TemplateComplexity
  content: Record<string, any>
  isPublic?: boolean
}

export interface UpdateTemplateDto {
  name?: string
  description?: string
  category?: string
  industry?: string
  complexity?: TemplateComplexity
  content?: Record<string, any>
  isPublic?: boolean
}

export interface TemplateFilterDto {
  category?: string
  industry?: string
  complexity?: TemplateComplexity
  isPublic?: boolean
  minRating?: number
}

// ============================================
// TIPOS PARA LA UI (frontend interno)
// ============================================
export interface Template {
  id: string
  name: string
  description?: string
  category?: string
  industry?: string
  complexity: string // Para mostrar en UI (ej: "Simple", "Medium", "Complex")
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

// Para los filtros en la UI
export interface TemplateFilters {
  search?: string
  category?: string
  industry?: string
  complexity?: TemplateComplexity
  onlyPublic?: boolean
  minRating?: number
}