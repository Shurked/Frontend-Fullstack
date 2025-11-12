import type { ProjectResponse } from './types.api'
import type { Project } from './list/types'

export function formatTypeForUI(type: string) {
  if (!type) return ''
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
}

export function avatarFromEmail(email?: string) {
  if (!email) return ''
  const name = encodeURIComponent(email.split('@')[0])
  return `https://ui-avatars.com/api/?name=${name}&background=E6E8F3&color=172B4D`
}

export function mapProjectResponseToUI(p: ProjectResponse): Project {
  return {
    id: p.id,
    name: p.name,
    type: formatTypeForUI(p.type),
    lead: {
      name: p.createdByName || p.createdByEmail || '—',
      avatar: avatarFromEmail(p.createdByEmail),
    },
    isFavorite: false,
    lastUpdated: new Date(p.updatedAt),
    description: p.description,
    membersCount: p.members?.length ?? 0,
    template: p.template, // ✅ PASAR TEMPLATE DINÁMICAMENTE
  }
}
