import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  color: string;
  members: TeamMember[];
}

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  editTeam?: Team;
  onSave?: (team: Omit<Team, 'id'>) => void;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ isOpen, onClose, editTeam, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    emails: '',
    role: 'Administrador'
  });

  const [members, setMembers] = useState<TeamMember[]>([]);

  const isEditMode = !!editTeam;

  // Cargar datos del equipo cuando esté en modo edición
  useEffect(() => {
    if (editTeam) {
      setFormData({
        name: editTeam.name,
        emails: '',
        role: 'Administrador'
      });
      setMembers(editTeam.members || []);
    } else {
      setFormData({
        name: '',
        emails: '',
        role: 'Administrador'
      });
      setMembers([]);
    }
  }, [editTeam, isOpen]);

  const roles = [
    'Administrador',
    'Editor',
    'Colaborador',
    'Visualizador'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSave) {
      onSave({
        name: formData.name,
        description: '',
        color: 'bg-blue-500',
        members: members
      });
    } else {
      console.log(isEditMode ? 'Updating team:' : 'Creating team:', {
        name: formData.name,
        members: members,
        newEmails: formData.emails,
        role: formData.role
      });
    }
    
    handleClose();
  };

  const handleClose = () => {
    onClose();
    if (!isEditMode) {
      setFormData({ name: '', emails: '', role: 'Administrador' });
      setMembers([]);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(prev => prev.filter(member => member.id !== memberId));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditMode ? 'Editar equipo' : 'Crear un nuevo equipo'}
          </h2>
          <button
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              {/* Nombre del equipo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de equipo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Kuska Team"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent text-gray-900 placeholder-gray-400"
                  required
                />
              </div>

              {/* Nombres o email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombres o email
                </label>
                <textarea
                  value={formData.emails}
                  onChange={(e) => handleChange('emails', e.target.value)}
                  placeholder="e.g., Jorge, jorge@gmail.com"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent resize-none text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Rol */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol
                </label>
                <div className="relative">
                  <select
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent appearance-none bg-white text-gray-700"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Right Column - Members List */}
            <div>
              <div className="border border-gray-200 rounded-lg p-4 h-full">
                <h3 className="font-medium text-gray-900 mb-4">
                  {isEditMode ? 'Miembros actuales' : 'Vista previa de miembros'}
                </h3>
                
                {members.length > 0 ? (
                  <div className="space-y-3">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.role}</p>
                          </div>
                        </div>
                        {isEditMode && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(member.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">
                      {isEditMode ? 'No hay miembros en este equipo' : 'Los miembros aparecerán aquí'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="lg:col-span-2 flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3f2890] transition-colors"
              >
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamModal;