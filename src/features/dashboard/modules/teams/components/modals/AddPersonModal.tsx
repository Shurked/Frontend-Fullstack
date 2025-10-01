import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPersonModal: React.FC<AddPersonModalProps> = ({ isOpen, onClose }) => {
  const [inviteInput, setInviteInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteInput.trim()) {
      // Aquí se enviaría la invitación
      console.log('Sending invitation to:', inviteInput);
      onClose();
      setInviteInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Añadir personas</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Campo de invitación */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombres o email
            </label>
            <textarea
              value={inviteInput}
              onChange={(e) => setInviteInput(e.target.value)}
              placeholder="e.g., Jorge, jorge@gmail.com"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!inviteInput.trim()}
              className="px-4 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3f2890] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Añadir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPersonModal;