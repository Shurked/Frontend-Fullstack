import React from 'react';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import type { ProjectWithStats } from '../types';

interface RecentProjectsProps {
  projects: ProjectWithStats[];
  onViewAll?: () => void;
  onViewProject?: (projectId: string) => void;
}

const ProjectCard: React.FC<{ project: ProjectWithStats; onViewProject?: (projectId: string) => void }> = ({ project, onViewProject }) => {
  const openElements = project.taskStats.total - project.taskStats.completed;
  const projectCode = project.code || 'PRJ';
  const projectInitial = projectCode.split('-')[0] || projectCode.substring(0, 3).toUpperCase();
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#4931A9' }}>
              {projectInitial}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{project.name}</h3>
              {project.code && <p className="text-gray-500 text-xs">{project.code}</p>}
            </div>
          </div>
          
          <div className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full mb-4">
            {project.type}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Completadas</p>
                <p className="text-lg font-bold text-gray-900">{project.taskStats.completed}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Abiertas</p>
                <p className="text-lg font-bold text-gray-900">{openElements}</p>
              </div>
            </div>
          </div>

          {project.progress !== undefined && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs font-medium text-gray-600 mb-2">
                <span>Progreso del proyecto</span>
                <span className="text-gray-900">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${project.progress}%`, backgroundColor: '#4931A9' }}
                ></div>
              </div>
            </div>
          )}

          <button 
            onClick={() => onViewProject?.(project.id)}
            className="w-full py-2 px-4 text-white font-medium rounded-lg hover:opacity-90 transition-opacity" 
            style={{ backgroundColor: '#4931A9' }}
          >
            Ver Tablero
          </button>
        </div>
      </div>
    </div>
  );
};

const RecentProjects: React.FC<RecentProjectsProps> = ({ projects, onViewAll, onViewProject }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Proyectos Recientes</h2>
        <button 
          onClick={onViewAll}
          className="flex items-center gap-2 px-4 py-2 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#4931A9' }}
        >
          <span>Todos los proyectos</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onViewProject={onViewProject} />
        ))}
      </div>
    </>
  );
};

export default RecentProjects;