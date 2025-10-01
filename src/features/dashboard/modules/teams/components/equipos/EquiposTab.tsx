import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users } from 'lucide-react';
import { CreateTeamModal } from '../modals';

interface Team {
  id: string;
  name: string;
  description: string;
  members: number;
  color: string;
  initials: string;
}

const EquiposTab: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Datos de ejemplo basados en el diseño
  const [teams] = useState<Team[]>([
    {
      id: '1',
      name: 'Plataforma de Desarrollo',
      description: 'Equipo encargado del desarrollo de la plataforma principal',
      members: 5,
      color: 'bg-blue-500',
      initials: 'PD'
    },
    {
      id: '2',
      name: 'Marketing Digital',
      description: 'Equipo de marketing y comunicación digital',
      members: 3,
      color: 'bg-green-500',
      initials: 'MD'
    },
    {
      id: '3',
      name: 'Diseño UX/UI',
      description: 'Equipo de diseño de experiencia e interfaz de usuario',
      members: 4,
      color: 'bg-purple-500',
      initials: 'UX'
    }
  ]);

  const handleTeamClick = (teamId: string) => {
    navigate(`/dashboard/teams/equipo/${teamId}`);
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
      />
    </div>
  );
};

export default EquiposTab;