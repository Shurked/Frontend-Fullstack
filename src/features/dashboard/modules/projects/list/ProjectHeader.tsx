import React from 'react';
import { ProjectFilter } from './types';

interface ProjectHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
  onCreateProject: () => void;
  projectsCount: number;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  onCreateProject,
  projectsCount,
}) => {
  const filters: { value: ProjectFilter; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'favorites', label: 'Favoritos' },
    { value: 'recent', label: 'Recientes' },
  ];

  return (
    <div className="mb-6">
      {/* Título y botón crear */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#172B4D]">
            Proyectos Recientes
          </h1>
          <p className="text-[#7A869A] text-sm mt-1">
            {projectsCount} {projectsCount === 1 ? 'proyecto' : 'proyectos'}
          </p>
        </div>
        <button
          onClick={onCreateProject}
          className="px-4 py-2 bg-[#4931A9] text-white font-semibold rounded-lg hover:bg-[#3d2889] transition-colors flex items-center gap-2"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="hidden sm:inline">Crear proyecto</span>
        </button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Búsqueda */}
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A869A]"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M21 21l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#DFE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent transition-all"
          />
        </div>

        {/* Filtros */}
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeFilter === filter.value
                  ? 'bg-[#4931A9] text-white'
                  : 'bg-white border border-[#DFE1E6] text-[#172B4D] hover:bg-[#F4F5F7]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
