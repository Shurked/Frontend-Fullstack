// src/features/dashboard/modules/templates/Templates.tsx
import React, { useState, useEffect } from 'react'
import { listTemplates } from './services/templates.service'
import { mapTemplateListToUI } from './mappers/template.mapper'
import type { Template } from './types/template.types'
import TemplateDetailsModal from './components/TemplateDetailsModal'
import CreateTemplateModal from './components/CreateTemplateModal'
import { Check } from 'lucide-react'

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [createdProject, setCreatedProject] = useState<any>(null)

  // Cargar templates del backend
  useEffect(() => {
    loadTemplates()
  }, [])

  async function loadTemplates() {
    try {
      setLoading(true)
      setError(null)
      
      const response = await listTemplates(true) // Incluir templates públicos
      const uiTemplates = mapTemplateListToUI(response)
      
      setTemplates(uiTemplates)
    } catch (err: any) {
      console.error('Error loading templates:', err)
      setError(err.response?.data?.message || 'Error al cargar templates')
    } finally {
      setLoading(false)
    }
  }

  function handleTemplateCreated(newTemplate: Template) {
    setTemplates(prev => [newTemplate, ...prev])
  }

  function handleTemplateUsed(project: any) {
    setCreatedProject(project)
    setShowSuccess(true)
    // Recargar templates para actualizar usageCount
    loadTemplates()
  }

  // Función para obtener el icono basado en templateType
  const getTemplateIcon = (templateType: string) => {
    switch (templateType) {
      case 'SCRUM':
        return (
          <div className="w-10 h-10 bg-[#4931A9] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
        )
      case 'KANBAN':
        return (
          <div className="w-10 h-10 bg-[#4931A9] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">K</span>
          </div>
        )
      case 'WATERFALL':
        return (
          <div className="w-10 h-10 bg-[#4931A9] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">W</span>
          </div>
        )
      default:
        return (
          <div className="w-10 h-10 bg-[#4931A9] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">T</span>
          </div>
        )
    }
  }

  // Estado de carga
  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4931A9] mx-auto mb-4"></div>
          <p className="text-[#7A869A]">Cargando templates...</p>
        </div>
      </div>
    )
  }

  // Estado de error
  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-semibold">Error al cargar templates</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={loadTemplates}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Estado sin datos
  if (templates.length === 0) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-[#172B4D]">
                Plantillas para el Desarrollo de Software
              </h1>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3d2889] transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Crear template
              </button>
            </div>
            <p className="text-[#7A869A]">
              Planifique, monitoree y publique software de calidad. Póngase en marcha rápidamente con plantillas que se adaptan a la forma de trabajar de su equipo.
            </p>
          </div>

          {/* Estado vacío */}
          <div className="text-center py-12">
            <svg className="w-24 h-24 mx-auto mb-4 text-[#DFE1E6]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
            <h3 className="text-xl font-bold text-[#172B4D] mb-2">
              No hay templates disponibles
            </h3>
            <p className="text-[#7A869A] mb-6">
              Crea tu primer template o explora los templates públicos
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-[#4931A9] text-white rounded-lg hover:bg-[#3d2889] transition-colors flex items-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Crear tu primer template
            </button>
          </div>
        </div>

        {/* Modal de creación */}
        <CreateTemplateModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreated={handleTemplateCreated}
        />
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-[#172B4D]">
            Plantillas para el Desarrollo de Software
          </h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3d2889] transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Crear template
          </button>
        </div>
        <p className="text-[#7A869A]">
          Planifique, monitoree y publique software de calidad. Póngase en marcha rápidamente con plantillas que se adaptan a la forma de trabajar de su equipo.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div 
            key={template.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Header con icono y badges */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getTemplateIcon(template.templateType)}
                <div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    template.isPublic 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {template.isPublic ? 'Público' : 'Privado'}
                  </span>
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                    {template.templateType}
                  </span>
                </div>
              </div>
              <span className="text-xs text-[#7A869A] bg-gray-100 px-2 py-1 rounded">
                {template.complexity}
              </span>
            </div>

            {/* Título */}
            <h3 className="text-lg font-semibold text-[#172B4D] mb-2">
              {template.name}
            </h3>

            {/* Descripción */}
            <p className="text-[#7A869A] text-sm mb-4 line-clamp-3">
              {template.description || 'Sin descripción'}
            </p>

            {/* Metadatos */}
            <div className="flex items-center gap-2 mb-4">
              {template.category && (
                <span className="px-2 py-1 bg-[#F4F5F7] text-[#7A869A] text-xs rounded">
                  {template.category}
                </span>
              )}
              {template.industry && (
                <span className="px-2 py-1 bg-[#F4F5F7] text-[#7A869A] text-xs rounded">
                  {template.industry}
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <span className="text-xs text-[#7A869A]">
                Por: {template.creator.name}
              </span>
              <span className="text-xs text-[#7A869A]">
                {template.usageCount} {template.usageCount === 1 ? 'uso' : 'usos'}
              </span>
            </div>

            {/* Botón ver detalles */}
            <button 
              onClick={() => setSelectedTemplate(template)}
              className="mt-3 w-full text-[#4931A9] text-sm font-semibold hover:text-[#37278c] transition-colors text-center py-2 border border-[#4931A9] rounded-lg hover:bg-[#4931A9] hover:text-white"
            >
              Ver detalles →
            </button>
          </div>
        ))}
      </div>

      {/* Modal de detalles */}
      <TemplateDetailsModal
        isOpen={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        template={selectedTemplate as Template}
        onTemplateUsed={handleTemplateUsed}
      />

      {/* Modal de creación */}
      <CreateTemplateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={handleTemplateCreated}
      />

      {/* Modal de éxito */}
      {showSuccess && createdProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-[#172B4D] mb-2">
                ¡Proyecto creado exitosamente!
              </h3>
              <p className="text-[#7A869A] mb-4">
                El proyecto "<span className="font-semibold text-[#172B4D]">{createdProject.name}</span>" ha sido creado desde el template.
              </p>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  setCreatedProject(null);
                }}
                className="px-6 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3d2889] transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Templates