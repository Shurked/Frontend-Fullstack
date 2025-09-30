import React, { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { CreateTeamModal } from '../modals';

interface Team {
  id: string;
  name: string;
  description: string;
  members: number;
  color: string;
}

const EquiposTab: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Datos de ejemplo basados en el diseño
  const [teams] = useState<Team[]>([
    {
      id: '1',
      name: 'Plataforma de Desarrollo',
      description: 'Equipo encargado del desarrollo de la plataforma principal',
      members: 5,
      color: 'bg-blue-500'
    }
  ]);

  return (
    <div className="flex flex-col h-full">
      {/* Header con botón crear equipo */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Equipos</h2>
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
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Header del equipo con imagen/color de fondo */}
              <div className={`h-24 ${team.color} flex items-center justify-center`}>
                <Users className="w-8 h-8 text-white" />
              </div>

              {/* Contenido del equipo */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{team.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{team.description}</p>
                
                {/* Información adicional */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{team.members} miembros</span>
                  <button className="text-[#4931A9] hover:text-[#3f2890] font-medium">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}

          {teams.length === 0 && (
            <div className="col-span-full text-center py-8">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hay equipos creados</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-2 text-[#4931A9] hover:text-[#3f2890] font-medium"
              >
                Crear tu primer equipo
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