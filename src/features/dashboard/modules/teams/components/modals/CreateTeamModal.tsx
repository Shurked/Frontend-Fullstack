import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Plus } from 'lucide-react';
import api from '../../../../../auth/services/axios.config';
import { toast } from 'react-hot-toast';

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
    description: '',
    emails: '',
    role: 'Administrador'
  });

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [friends, setFriends] = useState<TeamMember[]>([]);
  const [search, setSearch] = useState('');
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState('');

  const isEditMode = !!editTeam;

  // Cargar datos del equipo cuando esté en modo edición
  useEffect(() => {
    if (editTeam) {
      setFormData({
        name: editTeam.name,
        description: editTeam.description || '',
        emails: '',
        role: 'Administrador'
      });
      setMembers(editTeam.members || []);
    } else {
      setFormData({
        name: '',
        description: '',
        emails: '',
        role: 'Administrador'
      });
      setMembers([]);
      setLinks([]);
      setLinkInput('');
    }
  }, [editTeam, isOpen]);

  useEffect(() => {
    // load friends for selection
    (async () => {
      try {
        const resp = await api.get('/api/people/friends');
        const remoteFriends = resp?.data?.data?.items || [];
        const mappedFriends: TeamMember[] = remoteFriends.map((f: any) => ({ id: f.id, name: f.name, role: 'Colaborador', avatar: f.avatar || undefined }));
        setFriends(mappedFriends);
      } catch (err) {
        console.warn('Could not load friends for team modal', err);
      }
    })();
  }, [isOpen]);

  const roles = [
    'Administrador',
    'Editor',
    'Colaborador',
    'Visualizador'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    (async () => {
      try {
        const payload = {
          name: formData.name,
          description: formData.description,
          links: links.filter(l => l.trim().length > 0),
          members: members.map(m => ({ userId: m.id, role: m.role }))
        };

        const resp = await api.post('/api/teams', payload);
        if (resp?.data?.success) {
          const createdTeam = resp.data.data?.team;
          toast.success('Equipo creado correctamente');
          if (onSave && createdTeam) {
            // pass created team to parent so it can refresh UI
            onSave({ name: createdTeam.name, description: createdTeam.description || '', color: 'bg-blue-500', members: members });
          }
        }
      } catch (err: any) {
        console.error('Create team failed', err);
        const message = err?.response?.data?.message || 'Error creando equipo';
        toast.error(message);
      } finally {
        handleClose();
      }
    })();
  };

  const handleClose = () => {
    onClose();
    if (!isEditMode) {
      setFormData({ name: '', description: '', emails: '', role: 'Administrador' });
      setMembers([]);
      setLinks([]);
      setLinkInput('');
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

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe el propósito de este equipo..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent text-gray-900 placeholder-gray-400 resize-none"
                />
              </div>

              {/* Enlaces (opcional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enlaces (opcional)
                </label>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="url"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    placeholder="https://ejemplo.com"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                  <button 
                    type="button" 
                    onClick={() => {
                      if (linkInput.trim().length > 0) {
                        setLinks(prev => [...prev, linkInput.trim()]);
                        setLinkInput('');
                      }
                    }}
                    className="px-3 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3f2890]"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {links.length > 0 && (
                  <div className="space-y-1">
                    {links.map((link, idx) => (
                      <div key={idx} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded text-sm">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate flex-1">{link}</a>
                        <button type="button" onClick={() => setLinks(prev => prev.filter((_, i) => i !== idx))} className="ml-2 text-gray-400 hover:text-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Nombres o email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombres o email
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar entre tus amigos"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                  <button type="button" onClick={() => {
                    // add selected friend by exact match
                    const found = friends.find(f => f.name.toLowerCase() === search.trim().toLowerCase() || f.id === search.trim());
                    if (!found) { toast('No se encontró ese amigo'); return; }
                    if (members.find(m => m.id === found.id)) { toast('Ya está en la lista'); return; }
                    setMembers(prev => [...prev, { ...found }]);
                    setSearch('');
                  }} className="px-3 py-2 bg-[#4931A9] text-white rounded-lg"><Plus className="w-4 h-4" /></button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Puedes buscar por nombre entre tus amigos y añadirlos al equipo. Los miembros deben ser tus amigos.</p>
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
                        <div className="flex items-center space-x-2">
                          <select value={member.role} onChange={(e) => {
                            const role = e.target.value;
                            setMembers(prev => prev.map(m => m.id === member.id ? { ...m, role } : m));
                          }} className="px-2 py-1 border rounded-md text-sm">
                            {['Administrador','Editor','Colaborador','Visualizador'].map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(member.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
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