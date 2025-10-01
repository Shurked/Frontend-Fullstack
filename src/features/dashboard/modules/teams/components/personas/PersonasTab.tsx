import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AddPersonModal } from '../modals';

interface Person {
  id: string;
  name: string;
  trabajo?: string;
  ubicacion?: string;
  organizacion?: string;
  cargo?: string;
  avatar?: string;
  initials: string;
  color: string;
}

const PersonasTab: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Datos de ejemplo basados en el diseño
  const [personas] = useState<Person[]>([
    {
      id: '1',
      name: 'Jorge Castañeda',
      trabajo: 'Desarrollador Frontend',
      ubicacion: 'Madrid, España',
      organizacion: 'Kuska Tech',
      cargo: 'Senior Developer',
      initials: 'JC',
      color: 'bg-orange-500'
    }
  ]);

  const filters = [
    { key: 'trabajo', label: 'Trabajo' },
    { key: 'ubicacion', label: 'Ubicación' },
    { key: 'organizacion', label: 'Organización' },
    { key: 'cargo', label: 'Cargo' }
  ];

  const toggleFilter = (filterKey: string) => {
    setActiveFilters(prev => 
      prev.includes(filterKey) 
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  const filteredPersonas = personas.filter(persona =>
    persona.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePersonClick = (personaId: string) => {
    navigate(`/dashboard/profile/${personaId}`);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header con título y botón agregar */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-700">Personas con las que trabajas</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3f2890] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir</span>
          </button>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar personas"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent"
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => toggleFilter(filter.key)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                activeFilters.includes(filter.key)
                  ? 'bg-[#4931A9] text-white border-[#4931A9]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de personas */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {filteredPersonas.map((persona) => (
            <div
              key={persona.id}
              onClick={() => handlePersonClick(persona.id)}
              className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-[#4931A9] transition-all cursor-pointer"
            >
              {/* Avatar */}
              <div className={`w-12 h-12 ${persona.color} rounded-full flex items-center justify-center text-white font-semibold`}>
                {persona.initials}
              </div>

              {/* Información de la persona */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{persona.name}</h3>
                {persona.cargo && (
                  <p className="text-sm text-gray-500">{persona.cargo}</p>
                )}
                {persona.organizacion && (
                  <p className="text-xs text-gray-400">{persona.organizacion}</p>
                )}
              </div>

              {/* Información adicional */}
              <div className="text-right">
                {persona.ubicacion && (
                  <p className="text-xs text-gray-400">{persona.ubicacion}</p>
                )}
                {persona.trabajo && (
                  <p className="text-xs text-gray-500">{persona.trabajo}</p>
                )}
              </div>
            </div>
          ))}

          {filteredPersonas.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron personas</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal para agregar persona */}
      <AddPersonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default PersonasTab;