// src/features/dashboard/modules/templates/components/CreateTemplateModal.tsx
import React, { useState } from 'react'
import { createTemplate } from '../services/templates.service'
import { mapUIToCreateDto } from '../mappers/template.mapper'
import type { Template } from '../types/template.types'

interface CreateTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: (template: Template) => void
}

const COMPLEXITY_OPTIONS = [
  { value: 'SIMPLE', label: 'Simple' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'COMPLEX', label: 'Complex' }
]

const CATEGORY_OPTIONS = [
  { value: 'SOFTWARE', label: 'Software' },
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'DESIGN', label: 'Design' },
  { value: 'OPERATIONS', label: 'Operations' },
  { value: 'RESEARCH', label: 'Research' },
  { value: 'OTHER', label: 'Other' }
]

const INDUSTRY_OPTIONS = [
  { value: 'TECH', label: 'Tech' },
  { value: 'FINANCE', label: 'Finance' },
  { value: 'HEALTHCARE', label: 'Healthcare' },
  { value: 'EDUCATION', label: 'Education' },
  { value: 'RETAIL', label: 'Retail' },
  { value: 'MANUFACTURING', label: 'Manufacturing' },
  { value: 'OTHER', label: 'Other' }
]

const TEMPLATE_TYPE_OPTIONS = [
  { value: 'SIMPLE', label: 'Simple' },
  { value: 'SCRUM', label: 'Scrum' },
  { value: 'KANBAN', label: 'Kanban' },
  { value: 'WATERFALL', label: 'Waterfall' }
]

const CreateTemplateModal: React.FC<CreateTemplateModalProps> = ({
  isOpen,
  onClose,
  onCreated
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    industry: '',
    complexity: 'MEDIUM',
    templateType: 'SIMPLE',
    isPublic: false
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validaciones básicas
    if (!formData.name.trim()) {
      setError('El nombre es requerido')
      return
    }

    if (formData.name.length > 255) {
      setError('El nombre es muy largo (máximo 255 caracteres)')
      return
    }

    setLoading(true)

    try {
      // Crear el DTO
      const dto = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        category: formData.category as any,
        industry: formData.industry as any,
        complexity: formData.complexity as any,
        templateType: formData.templateType as any,
        content: {}, // El backend generará el contenido estructurado automáticamente
        isPublic: formData.isPublic
      }

      // Llamar al backend
      const response = await createTemplate(dto)

      // Transformar y notificar
      const uiTemplate: Template = {
        id: response.id,
        name: response.name,
        description: response.description,
        category: response.category,
        industry: response.industry,
        complexity: response.complexity,
        templateType: response.templateType,
        content: response.content,
        isPublic: response.isPublic,
        usageCount: response.usageCount,
        rating: response.rating,
        creator: {
          name: response.createdByName || response.createdByEmail || '',
          email: response.createdByEmail || ''
        },
        lastUpdated: new Date(response.updatedAt),
        createdAt: new Date(response.createdAt)
      }

      onCreated(uiTemplate)
      onClose()

      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        industry: '',
        complexity: 'MEDIUM',
        templateType: 'SIMPLE',
        isPublic: false
      })
    } catch (err: any) {
      console.error('Error creating template:', err)
      setError(err.response?.data?.message || 'Error al crear el template')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      onClose()
      // Reset form al cerrar
      setFormData({
        name: '',
        description: '',
        category: '',
        industry: '',
        complexity: 'MEDIUM',
        templateType: 'SIMPLE',
        isPublic: false
      })
      setError(null)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-lg font-semibold text-[#172B4D]">
            Crear nuevo template
          </h3>
          <button
            onClick={handleClose}
            className="text-[#7A869A] hover:text-[#172B4D] transition-colors"
            disabled={loading}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-[#172B4D] mb-1">
              Nombre *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-[#DFE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent transition-all"
              placeholder="Ej: Scrum Framework"
              required
              disabled={loading}
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-[#172B4D] mb-1">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-[#DFE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent transition-all"
              placeholder="Describe el propósito del template..."
              rows={3}
              disabled={loading}
            />
          </div>

          {/* Tipo de Template */}
          <div>
            <label className="block text-sm font-medium text-[#172B4D] mb-1">
              Tipo de Template
            </label>
            <select
              value={formData.templateType}
              onChange={(e) => setFormData({ ...formData, templateType: e.target.value })}
              className="w-full px-4 py-2 border border-[#DFE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent transition-all"
              disabled={loading}
            >
              {TEMPLATE_TYPE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Complejidad */}
          <div>
            <label className="block text-sm font-medium text-[#172B4D] mb-1">
              Complejidad
            </label>
            <select
              value={formData.complexity}
              onChange={(e) => setFormData({ ...formData, complexity: e.target.value })}
              className="w-full px-4 py-2 border border-[#DFE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent transition-all"
              disabled={loading}
            >
              {COMPLEXITY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-[#172B4D] mb-1">
              Categoría
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-[#DFE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent transition-all"
              disabled={loading}
            >
              <option value="">Seleccionar categoría</option>
              {CATEGORY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Industria */}
          <div>
            <label className="block text-sm font-medium text-[#172B4D] mb-1">
              Industria
            </label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              className="w-full px-4 py-2 border border-[#DFE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent transition-all"
              disabled={loading}
            >
              <option value="">Seleccionar industria</option>
              {INDUSTRY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Público/Privado */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublic"
              checked={formData.isPublic}
              onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
              className="w-4 h-4 text-[#4931A9] border-gray-300 rounded focus:ring-[#4931A9]"
              disabled={loading}
            />
            <label htmlFor="isPublic" className="text-sm text-[#172B4D]">
              Hacer este template público
            </label>
          </div>

          {/* Información adicional */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-[#172B4D] mb-1">
              Información importante
            </h4>
            <p className="text-xs text-[#7A869A]">
              El contenido del template se generará automáticamente según el tipo seleccionado. 
              Podrás personalizarlo después de crear el template.
            </p>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-[#DFE1E6] rounded-lg text-[#172B4D] hover:bg-[#F4F5F7] transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3d2889] disabled:opacity-50 transition-colors flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creando...
                </>
              ) : (
                'Crear template'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTemplateModal