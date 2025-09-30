import React, { useState } from 'react';
import { X, Users, FileText, Palette } from 'lucide-react';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'bg-blue-500'
  });

  const colors = [
    { value: 'bg-blue-500', name: 'Azul' },
    { value: 'bg-green-500', name: 'Verde' },
    { value: 'bg-purple-500', name: 'Morado' },
    { value: 'bg-red-500', name: 'Rojo' },
    { value: 'bg-yellow-500', name: 'Amarillo' },
    { value: 'bg-pink-500', name: 'Rosa' },
    { value: 'bg-indigo-500', name: 'Índigo' },
    { value: 'bg-gray-500', name: 'Gris' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se crearía el equipo
    console.log('Creating team:', formData);
    onClose();
    setFormData({ name: '', description: '', color: 'bg-blue-500' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Crear Nuevo Equipo</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre del equipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del equipo
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Equipo de desarrollo"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe el propósito y objetivos del equipo"
                rows={3}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Color del equipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Palette className="inline w-4 h-4 mr-1" />
              Color del equipo
            </label>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  className={`w-12 h-12 ${color.value} rounded-lg border-2 transition-all ${
                    formData.color === color.value
                      ? 'border-gray-800 scale-110'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vista previa
            </label>
            <div className="border border-gray-200 rounded-lg p-3">
              <div className={`h-16 ${formData.color} rounded-lg flex items-center justify-center mb-2`}>
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-medium text-gray-900">{formData.name || 'Nombre del equipo'}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {formData.description || 'Descripción del equipo'}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3f2890] transition-colors"
            >
              Crear Equipo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamModal;