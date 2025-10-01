import React from 'react';
import { X, Check } from 'lucide-react';

interface TemplateFeature {
  id: string;
  text: string;
}

interface TemplateDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    features?: TemplateFeature[];
    idealFor?: string[];
  };
}

const TemplateDetailsModal: React.FC<TemplateDetailsModalProps> = ({
  isOpen,
  onClose,
  template
}) => {
  if (!isOpen) return null;

  const defaultFeatures: TemplateFeature[] = [
    { id: '1', text: 'Columnas personalizadas' },
    { id: '2', text: 'Drag & drop' },
    { id: '3', text: 'Límites WIP' },
    { id: '4', text: 'Visualización de flujo' },
  ];

  const defaultIdealFor = [
    'Equipos de desarrollo',
    'Gestión visual',
    'Metodologías Lean'
  ];

  const features = template.features || defaultFeatures;
  const idealFor = template.idealFor || defaultIdealFor;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className={`${template.color}`}>
              {template.icon}
            </div>
            <h2 className="text-2xl font-bold text-[#172B4D]">{template.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[#172B4D] mb-2">Descripción</h3>
            <p className="text-[#7A869A]">{template.description}</p>
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
                  <div className="w-5 h-5 rounded-full bg-[#4931a9d7] bg-opacity-10 flex items-center justify-center">
                    <Check size={14} className="text-[#ffffff]" />
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
                  className="px-3 py-1 bg-[#4931a9be] bg-opacity-10 text-[#ffffff] rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-[#7A869A] hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button className="px-6 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#37278c] transition-colors">
            Usar plantilla
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetailsModal;