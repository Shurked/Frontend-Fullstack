import React, { useState } from 'react';
import TemplateDetailsModal from './components/TemplateDetailsModal';

interface Template {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const templates: Template[] = [
  {
    id: '1',
    title: 'Kanban',
    description: 'Ideal para gestionar proyectos de principio a fin con tableros Kanban, seguimiento de sprints y reportes de progreso.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
        <path d="M38 6H10C7.79086 6 6 7.79086 6 10V38C6 40.2091 7.79086 42 10 42H38C40.2091 42 42 40.2091 42 38V10C42 7.79086 40.2091 6 38 6Z" stroke="currentColor" strokeWidth="2"/>
        <rect x="12" y="12" width="8" height="24" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="24" y="12" width="8" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="36" y="12" width="8" height="20" rx="2" transform="rotate(90 36 12)" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    color: 'text-[#4931A9]'
  },
  {
    id: '2',
    title: 'Gestión de Tareas',
    description: 'Plantilla simple para gestionar tareas diarias, to-dos y seguimiento de trabajo individual o en equipo.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
        <path d="M6 10C6 7.79086 7.79086 6 10 6H38C40.2091 6 42 7.79086 42 10V38C42 40.2091 40.2091 42 38 42H10C7.79086 42 6 40.2091 6 38V10Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 24L22 30L34 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'text-[#172B4D]'
  },
  {
    id: '3',
    title: 'Seguimiento de Bugs',
    description: 'Organiza y prioriza errores de software con flujos de trabajo personalizados para QA y desarrollo.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
        <path d="M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M18 22C19.1046 22 20 21.1046 20 20C20 18.8954 19.1046 18 18 18C16.8954 18 16 18.8954 16 20C16 21.1046 16.8954 22 18 22Z" fill="currentColor"/>
        <path d="M30 22C31.1046 22 32 21.1046 32 20C32 18.8954 31.1046 18 30 18C28.8954 18 28 18.8954 28 20C28 21.1046 28.8954 22 30 22Z" fill="currentColor"/>
        <path d="M16 30C16 30 19 26 24 26C29 26 32 30 32 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: 'text-[#172B4D]'
  },
  {
    id: '4',
    title: 'Colaboración de Equipo',
    description: 'Facilita la colaboración entre equipos con espacios compartidos, documentación y comunicación integrada.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="16" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 42C6 34.268 14.268 28 24 28C33.732 28 42 34.268 42 42" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    color: 'text-[#172B4D]'
  },
  {
    id: '5',
    title: 'Scrum Ágil',
    description: 'Framework completo de Scrum con sprints, backlog refinement, y ceremonias ágiles integradas.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
        <path d="M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M24 12V24L32 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: 'text-[#172B4D]'
  },
  {
    id: '6',
    title: 'Planificación de Roadmap',
    description: 'Visualiza y planifica la hoja de ruta de productos con líneas de tiempo, dependencias y milestones.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="8" width="36" height="32" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 18H16M12 24H20M12 30H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: 'text-[#172B4D]'
  }
];

const Templates: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#172B4D] mb-2">Plantillas para el Desarrollo de Software</h1>
        <p className="text-[#7A869A]">Planifique, monitoree y publique software de calidad. Póngase en marcha rápidamente con plantillas que se adaptan a la forma de trabajar de su equipo.</p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div 
            key={template.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className={`${template.color} mb-4`}>
              {template.icon}
            </div>
            <h3 className="text-lg font-semibold text-[#172B4D] mb-2">
              {template.title}
            </h3>
            <p className="text-[#7A869A] text-sm mb-4">
              {template.description}
            </p>
            <button 
              onClick={() => setSelectedTemplate(template)}
              className="text-[#4931A9] text-sm font-semibold hover:text-[#37278c] transition-colors"
            >
              Ver detalles →
            </button>
          </div>
        ))}
      </div>

      {/* Template Details Modal */}
      <TemplateDetailsModal
        isOpen={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        template={selectedTemplate as Template}
      />
    </div>
  );
};

export default Templates;