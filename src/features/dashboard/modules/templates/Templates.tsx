// import React, { useState } from 'react';
// import TemplateDetailsModal from './components/TemplateDetailsModal';

// interface Template {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   color: string;
// }

// const templates: Template[] = [
//   {
//     id: '1',
//     title: 'Kanban',
//     description: 'Ideal para gestionar proyectos de principio a fin con tableros Kanban, seguimiento de sprints y reportes de progreso.',
//     icon: (
//       <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
//         <path d="M38 6H10C7.79086 6 6 7.79086 6 10V38C6 40.2091 7.79086 42 10 42H38C40.2091 42 42 40.2091 42 38V10C42 7.79086 40.2091 6 38 6Z" stroke="currentColor" strokeWidth="2"/>
//         <rect x="12" y="12" width="8" height="24" rx="2" stroke="currentColor" strokeWidth="2"/>
//         <rect x="24" y="12" width="8" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
//         <rect x="36" y="12" width="8" height="20" rx="2" transform="rotate(90 36 12)" stroke="currentColor" strokeWidth="2"/>
//       </svg>
//     ),
//     color: 'text-[#4931A9]'
//   },
//   {
//     id: '2',
//     title: 'Gestión de Tareas',
//     description: 'Plantilla simple para gestionar tareas diarias, to-dos y seguimiento de trabajo individual o en equipo.',
//     icon: (
//       <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
//         <path d="M6 10C6 7.79086 7.79086 6 10 6H38C40.2091 6 42 7.79086 42 10V38C42 40.2091 40.2091 42 38 42H10C7.79086 42 6 40.2091 6 38V10Z" stroke="currentColor" strokeWidth="2"/>
//         <path d="M16 24L22 30L34 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     ),
//     color: 'text-[#172B4D]'
//   },
//   {
//     id: '3',
//     title: 'Seguimiento de Bugs',
//     description: 'Organiza y prioriza errores de software con flujos de trabajo personalizados para QA y desarrollo.',
//     icon: (
//       <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
//         <path d="M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42Z" stroke="currentColor" strokeWidth="2"/>
//         <path d="M18 22C19.1046 22 20 21.1046 20 20C20 18.8954 19.1046 18 18 18C16.8954 18 16 18.8954 16 20C16 21.1046 16.8954 22 18 22Z" fill="currentColor"/>
//         <path d="M30 22C31.1046 22 32 21.1046 32 20C32 18.8954 31.1046 18 30 18C28.8954 18 28 18.8954 28 20C28 21.1046 28.8954 22 30 22Z" fill="currentColor"/>
//         <path d="M16 30C16 30 19 26 24 26C29 26 32 30 32 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     color: 'text-[#172B4D]'
//   },
//   {
//     id: '4',
//     title: 'Colaboración de Equipo',
//     description: 'Facilita la colaboración entre equipos con espacios compartidos, documentación y comunicación integrada.',
//     icon: (
//       <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
//         <circle cx="24" cy="16" r="10" stroke="currentColor" strokeWidth="2"/>
//         <path d="M6 42C6 34.268 14.268 28 24 28C33.732 28 42 34.268 42 42" stroke="currentColor" strokeWidth="2"/>
//       </svg>
//     ),
//     color: 'text-[#172B4D]'
//   },
//   {
//     id: '5',
//     title: 'Scrum Ágil',
//     description: 'Framework completo de Scrum con sprints, backlog refinement, y ceremonias ágiles integradas.',
//     icon: (
//       <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
//         <path d="M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42Z" stroke="currentColor" strokeWidth="2"/>
//         <path d="M24 12V24L32 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     color: 'text-[#172B4D]'
//   },
//   {
//     id: '6',
//     title: 'Planificación de Roadmap',
//     description: 'Visualiza y planifica la hoja de ruta de productos con líneas de tiempo, dependencias y milestones.',
//     icon: (
//       <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
//         <rect x="6" y="8" width="36" height="32" rx="2" stroke="currentColor" strokeWidth="2"/>
//         <path d="M12 18H16M12 24H20M12 30H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     color: 'text-[#172B4D]'
//   }
// ];

// const Templates: React.FC = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-[#172B4D] mb-2">Plantillas para el Desarrollo de Software</h1>
//         <p className="text-[#7A869A]">Planifique, monitoree y publique software de calidad. Póngase en marcha rápidamente con plantillas que se adaptan a la forma de trabajar de su equipo.</p>
//       </div>

//       {/* Templates Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {templates.map((template) => (
//           <div 
//             key={template.id}
//             className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
//           >
//             <div className={`${template.color} mb-4`}>
//               {template.icon}
//             </div>
//             <h3 className="text-lg font-semibold text-[#172B4D] mb-2">
//               {template.title}
//             </h3>
//             <p className="text-[#7A869A] text-sm mb-4">
//               {template.description}
//             </p>
//             <button 
//               onClick={() => setSelectedTemplate(template)}
//               className="text-[#4931A9] text-sm font-semibold hover:text-[#37278c] transition-colors"
//             >
//               Ver detalles →
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Template Details Modal */}
//       <TemplateDetailsModal
//         isOpen={!!selectedTemplate}
//         onClose={() => setSelectedTemplate(null)}
//         template={selectedTemplate as Template}
//       />
//     </div>
//   );
// };

// export default Templates;

// src/features/dashboard/modules/templates/Templates.tsx

import React, { useState, useEffect } from 'react'
import { listTemplates } from './services/templates.service'
import { mapTemplateListToUI } from './mappers/template.mapper'
import type { Template } from './types/template.types'
import TemplateDetailsModal from './components/TemplateDetailsModal'
import CreateTemplateModal from './components/CreateTemplateModal'

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

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
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
        <div className="max-w-4xl mx-auto text-center py-12">
          <svg className="w-24 h-24 mx-auto mb-4 text-[#DFE1E6]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
          </svg>
          <h3 className="text-xl font-bold text-[#172B4D] mb-2">
            No hay templates disponibles
          </h3>
          <p className="text-[#7A869A]">
            Crea tu primer template o explora los templates públicos
          </p>
        </div>
      </div>
    )
  }

  function handleTemplateCreated(newTemplate: Template) {
    setTemplates(prev => [newTemplate, ...prev])
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
            {/* Badge de público/privado */}
            <div className="flex items-center justify-between mb-4">
              <span className={`px-2 py-1 text-xs rounded ${
                template.isPublic 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {template.isPublic ? 'Público' : 'Privado'}
              </span>
              <span className="text-xs text-[#7A869A]">
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
                {template.usageCount} usos
              </span>
            </div>

            {/* Botón ver detalles */}
            <button 
              onClick={() => setSelectedTemplate(template)}
              className="mt-3 w-full text-[#4931A9] text-sm font-semibold hover:text-[#37278c] transition-colors"
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
        template={selectedTemplate as any}
      />

      {/* Modal de creación */}
      <CreateTemplateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={handleTemplateCreated}
      />
    </div>
  )
}

export default Templates