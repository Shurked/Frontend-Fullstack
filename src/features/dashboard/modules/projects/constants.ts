import type { TemplateType } from './types.api'

export const TEMPLATE_TYPES: { value: TemplateType; label: string }[] = [
  { value: 'SCRUM', label: 'Scrum' },
  { value: 'KANBAN', label: 'Kanban' },
  { value: 'SIMPLE', label: 'Simple' },
]
