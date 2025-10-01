import React from 'react';
import { Project } from './types';

interface ProjectCardProps {
  project: Project;
  onToggleFavorite: (projectId: string) => void;
  onProjectClick: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onToggleFavorite,
  onProjectClick,
}) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    if (days < 7) return `Hace ${days} días`;
    if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`;
    return `Hace ${Math.floor(days / 30)} meses`;
  };

  return (
    <div
      className="bg-white border border-[#DFE1E6] rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => onProjectClick(project.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          {/* Icon/Avatar del proyecto */}
          <div className="w-10 h-10 bg-[#4931A9] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">
              {project.name.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Nombre y tipo */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[#172B4D] font-semibold text-base group-hover:text-[#4931A9] transition-colors truncate">
              {project.name}
            </h3>
            <p className="text-[#7A869A] text-sm">{project.type}</p>
          </div>
        </div>

        {/* Botón favorito */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(project.id);
          }}
          className="text-[#7A869A] hover:text-[#FFAB00] transition-colors p-1"
          aria-label={project.isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={project.isFavorite ? '#FFAB00' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      </div>

      {/* Descripción (si existe) */}
      {project.description && (
        <p className="text-[#7A869A] text-sm mb-3 line-clamp-2">
          {project.description}
        </p>
      )}

      {/* Footer con Lead y última actualización */}
      <div className="flex items-center justify-between pt-3 border-t border-[#DFE1E6]">
        <div className="flex items-center gap-2">
          <img
            src={project.lead.avatar}
            alt={project.lead.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-[#7A869A] text-sm">{project.lead.name}</span>
        </div>

        <div className="flex items-center gap-4">
          {project.membersCount && (
            <div className="flex items-center gap-1 text-[#7A869A] text-sm">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path
                  d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{project.membersCount}</span>
            </div>
          )}
          <span className="text-[#7A869A] text-xs">
            {formatDate(project.lastUpdated)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
