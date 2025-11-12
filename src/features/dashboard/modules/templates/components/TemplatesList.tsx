// src/features/dashboard/modules/templates/components/TemplatesList.tsx

import React, { useState, useEffect } from 'react'
import { listTemplates } from '../services/templates.service'
import { mapTemplateListToUI } from '../mappers/template.mapper'
import type { Template } from '../types/template.types'

const TemplatesList: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar templates al montar el componente
  useEffect(() => {
    loadTemplates()
  }, [])

  async function loadTemplates() {
    try {
      setLoading(true)
      setError(null)
      
      // 1. Llamar al servicio (automáticamente incluye JWT)
      const response = await listTemplates(true) // true = incluir públicos
      
      // 2. Transformar con el mapper
      const uiTemplates = mapTemplateListToUI(response)
      
      // 3. Actualizar estado
      setTemplates(uiTemplates)
    } catch (err: any) {
      console.error('Error loading templates:', err)
      setError(err.response?.data?.message || 'Error al cargar templates')
    } finally {
      setLoading(false)
    }
  }

  // Estados de carga
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4931A9]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#172B4D]">Templates</h1>
        <span className="text-[#7A869A]">
          {templates.length} template{templates.length !== 1 ? 's' : ''}
        </span>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#7A869A]">No hay templates disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white border border-[#DFE1E6] rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              {/* Nombre del template */}
              <h3 className="text-lg font-semibold text-[#172B4D] mb-2">
                {template.name}
              </h3>

              {/* Descripción */}
              {template.description && (
                <p className="text-sm text-[#7A869A] mb-3 line-clamp-2">
                  {template.description}
                </p>
              )}

              {/* Metadatos */}
              <div className="flex items-center gap-2 text-xs text-[#7A869A]">
                <span className="px-2 py-1 bg-[#F4F5F7] rounded">
                  {template.complexity}
                </span>
                {template.category && (
                  <span className="px-2 py-1 bg-[#F4F5F7] rounded">
                    {template.category}
                  </span>
                )}
                {template.isPublic && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                    Público
                  </span>
                )}
              </div>

              {/* Footer con creador y usos */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#DFE1E6]">
                <span className="text-xs text-[#7A869A]">
                  Por: {template.creator.name}
                </span>
                <span className="text-xs text-[#7A869A]">
                  {template.usageCount} usos
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TemplatesList