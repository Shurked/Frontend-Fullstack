import React, { useState } from 'react';
import { X, Link as LinkIcon } from 'lucide-react';

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (link: { title: string; url: string; description?: string }) => void;
}

const AddLinkModal: React.FC<AddLinkModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: ''
  });

  const [errors, setErrors] = useState({
    title: '',
    url: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    const newErrors = {
      title: '',
      url: ''
    };

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.url.trim()) {
      newErrors.url = 'La URL es requerida';
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = 'Por favor ingresa una URL válida';
    }

    setErrors(newErrors);

    // Si no hay errores, proceder
    if (!newErrors.title && !newErrors.url) {
      onAdd?.({
        title: formData.title.trim(),
        url: formData.url.trim(),
        description: formData.description.trim() || undefined
      });
      
      // Limpiar formulario
      setFormData({
        title: '',
        url: '',
        description: ''
      });
      
      setErrors({
        title: '',
        url: ''
      });
      
      onClose();
    }
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      url: '',
      description: ''
    });
    setErrors({
      title: '',
      url: ''
    });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Añadir Link Fijado</h2>
          <button
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Título */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título del link
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: Documentación del proyecto"
              required
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => handleChange('url', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent ${
                errors.url ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://ejemplo.com"
              required
            />
            {errors.url && (
              <p className="mt-1 text-sm text-red-600">{errors.url}</p>
            )}
          </div>

          {/* Descripción */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (opcional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent resize-none"
              placeholder="Descripción breve del recurso..."
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3f2890] transition-colors"
            >
              Añadir Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLinkModal;