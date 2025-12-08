import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users } from 'lucide-react';
import { CreateTeamModal } from '../modals';
import api from '../../../../../auth/services/axios.config';
import { toast } from 'react-hot-toast';

interface Team {
  id: string;
  name: string;
  description: string;
  members: number;
  color: string;
  initials: string;
  createdAt?: string;
}

const EquiposTab: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);

  const loadTeams = async () => {
    try {
      const resp = await api.get('/api/teams');
      const items = resp?.data?.data?.teams || [];
      // Map to Team shape
      const mapped: Team[] = items.map((t: any) => ({ 
        id: t.id, 
        name: t.name, 
        description: t.description || '', 
        members: t.membersCount || 0, 
        color: 'bg-blue-500', 
        initials: (t.name || '').split(' ').map((s: string) => s[0]).slice(0,2).join('').toUpperCase(),
        createdAt: t.createdAt 
      }));
      setTeams(mapped);
    } catch (err) {
      console.error('Failed to load teams', err);
      toast.error('No se pudieron cargar los equipos');
    }
  };

  const handleTeamClick = (teamId: string) => {
    navigate(`/dashboard/teams/equipo/${teamId}`);
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleCreated = (_newTeam: any) => {
    // Refresh list after creation
    loadTeams();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header con título y botón crear equipo */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-700">Equipos de trabajo</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3f2890] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Equipo</span>
          </button>
        </div>
      </div>

      {/* Lista de equipos */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teams.map((team) => (
            <div
              key={team.id}
              onClick={() => handleTeamClick(team.id)}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer p-4"
            >
              {/* Avatar del equipo */}
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-12 h-12 ${team.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-semibold text-sm">{team.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{team.name}</h3>
                  <p className="text-sm text-gray-500">{team.members} miembros</p>
                </div>
              </div>
              
              {/* Descripción */}
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{team.description}</p>
              
              {/* Fecha de creación */}
              {team.createdAt && (
                <p className="text-xs text-gray-500 mb-3">
                  Creado el {new Date(team.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              )}
              
              {/* Botón ver más */}
              <div className="flex justify-end">
                <span className="text-xs text-[#4931A9] font-medium hover:text-[#3f2890]">
                  Ver detalles →
                </span>
              </div>
            </div>
          ))}

          {teams.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay equipos creados</h3>
              <p className="text-gray-500 mb-4">Crea tu primer equipo para empezar a colaborar</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3f2890] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Crear primer equipo</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal para crear equipo */}
      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreated as any}
      />
    </div>
  );
};

export default EquiposTab;