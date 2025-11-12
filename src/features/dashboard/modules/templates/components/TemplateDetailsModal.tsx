// src/features/dashboard/modules/templates/components/TemplateDetailsModal.tsx

import React, { useState } from 'react';
import { X, Check, Loader } from 'lucide-react';
import { useTemplate, incrementTemplateUsage } from '../services/templates.service';
import { Template } from '../types/template.types';

// Actualiza la interfaz para usar el Template real
interface TemplateDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template; // ✅ Ahora usa el tipo Template real
  onTemplateUsed?: (project: any) => void; // ✅ Callback cuando se usa el template
}

const TemplateDetailsModal: React.FC<TemplateDetailsModalProps> = ({
  isOpen,
  onClose,
  template,
  onTemplateUsed
}) => {
  const [projectName, setProjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Función para generar características basadas en el tipo de template
  const getTemplateFeatures = () => {
    const baseFeatures = [
      { id: '1', text: 'Columnas personalizadas' },
      { id: '2', text: 'Drag & drop' },
      { id: '3', text: 'Seguimiento de progreso' },
    ];

    switch (template.templateType) {
      case 'SCRUM':
        return [
          ...baseFeatures,
          { id: '4', text: 'Sprints y planning' },
          { id: '5', text: 'Ceremonias ágiles' },
          { id: '6', text: 'Backlog management' }
        ];
      case 'KANBAN':
        return [
          ...baseFeatures,
          { id: '4', text: 'Límites WIP' },
          { id: '5', text: 'Métricas de flujo' },
          { id: '6', text: 'Visualización de flujo' }
        ];
      case 'WATERFALL':
        return [
          ...baseFeatures,
          { id: '4', text: 'Fases secuenciales' },
          { id: '5', text: 'Documentación estructurada' },
          { id: '6', text: 'Gate reviews' }
        ];
      default:
        return [
          ...baseFeatures,
          { id: '4', text: 'Gestión de tareas' },
          { id: '5', text: 'Prioridades' },
          { id: '6', text: 'Estados personalizables' }
        ];
    }
  };

  // Función para generar "Ideal para" basado en categoría/industria
  const getIdealFor = () => {
    const baseItems = ['Gestión de proyectos', 'Trabajo en equipo'];
    
    if (template.category === 'SOFTWARE') {
      return [...baseItems, 'Equipos de desarrollo', 'Metodologías ágiles'];
    }
    if (template.industry === 'TECH') {
      return [...baseItems, 'Startups tecnológicas', 'Empresas de software'];
    }
    
    return baseItems;
  };

  const handleUseTemplate = async () => {
    if (!projectName.trim()) {
      setError('Por favor ingresa un nombre para el proyecto');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Crear proyecto desde el template
      const project = await useTemplate(template.id, projectName.trim());
      
      // 2. Incrementar contador de uso
      await incrementTemplateUsage(template.id);
      
      // 3. Notificar al componente padre
      if (onTemplateUsed) {
        onTemplateUsed(project);
      }
      
      // 4. Cerrar modal
      onClose();
      
      // 5. Reset form
      setProjectName('');
      
    } catch (err: any) {
      console.error('Error using template:', err);
      setError(err.response?.data?.message || 'Error al usar el template');
    } finally {
      setLoading(false);
    }
  };

  const features = getTemplateFeatures();
  const idealFor = getIdealFor();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center gap-4">
            <div className={`text-[#4931A9]`}>
              {/* Icono dinámico basado en templateType */}
              {template.templateType === 'SCRUM' && (
                <div className="w-12 h-12 bg-[#4931A9] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
              )}
              {template.templateType === 'KANBAN' && (
                <div className="w-12 h-12 bg-[#4931A9] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
              )}
              {template.templateType === 'SIMPLE' && (
                <div className="w-12 h-12 bg-[#4931A9] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
              )}
              {template.templateType === 'WATERFALL' && (
                <div className="w-12 h-12 bg-[#4931A9] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#172B4D]">{template.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                  {template.templateType}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {template.complexity}
                </span>
                {template.isPublic && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                    Público
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[#172B4D] mb-2">Descripción</h3>
            <p className="text-[#7A869A]">
              {template.description || 'Este template no tiene descripción.'}
            </p>
          </div>

          {/* Project Name Input */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[#172B4D] mb-2">
              Crear proyecto desde este template
            </h3>
            <div className="space-y-2">
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Nombre del nuevo proyecto..."
                className="w-full px-4 py-2 border border-[#DFE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent transition-all"
                disabled={loading}
              />
              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[#172B4D] mb-4">Características incluidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map(feature => (
                <div
                  key={feature.id}
                  className="flex items-center gap-2 text-[#7A869A]"
                >
                  <div className="w-5 h-5 rounded-full bg-[#4931A9] bg-opacity-10 flex items-center justify-center">
                    <Check size={14} className="text-[#4931A9]" />
                  </div>
                  {feature.text}
                </div>
              ))}
            </div>
          </div>

          {/* Ideal for */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[#172B4D] mb-4">Ideal para</h3>
            <div className="flex flex-wrap gap-2">
              {idealFor.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#4931A9] bg-opacity-10 text-[#4931A9] rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#4931A9]">{template.usageCount}</div>
              <div className="text-sm text-[#7A869A]">Veces usado</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#4931A9]">
                {template.rating ? template.rating.toFixed(1) : 'N/A'}
              </div>
              <div className="text-sm text-[#7A869A]">Rating</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t border-gray-200 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-[#7A869A] hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Cancelar
          </button>
          <button 
            onClick={handleUseTemplate}
            disabled={loading || !projectName.trim()}
            className="px-6 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#37278c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader size={16} className="animate-spin" />
                Creando proyecto...
              </>
            ) : (
              'Usar plantilla'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetailsModal;