import React from 'react';

interface Project {
  id: number;
  name: string;
  type: string;
  quickAccess: string;
  completedElements: number;
  openElements: number;
  board: string;
  progress?: number;
  members?: number;
  lastUpdate?: string;
}

interface RecentProjectsProps {
  projects: Project[];
  onViewAll?: () => void;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h3 className="font-semibold text-[#172B4D] text-lg mb-1">{project.name}</h3>
        <p className="text-[#7A869A] text-sm mb-4">{project.type}</p>

        <div className="space-y-2 mb-4">
          <p className="text-[#4931A9] text-sm font-medium cursor-pointer hover:text-[#372189]">
            {project.quickAccess}
          </p>

          <div className="flex items-center space-x-4 text-sm text-[#7A869A]">
            <span>Elementos realizados <span className="font-medium text-[#172B4D]">{project.completedElements}</span></span>
            <span>Elementos abiertos <span className="font-medium text-[#172B4D]">{project.openElements}</span></span>
          </div>
        </div>

        <button className="text-[#4931A9] text-sm font-medium hover:text-[#372189] transition-colors">
          {project.board}
        </button>
      </div>
    </div>
  </div>
);

const RecentProjects: React.FC<RecentProjectsProps> = ({ projects, onViewAll }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#172B4D]">Proyectos Recientes</h2>
        <button 
          onClick={onViewAll}
          className="text-[#4931A9] text-sm font-medium hover:text-[#372189] transition-colors"
        >
          Todos los proyectos
        </button>
      </div>

      <div className="mb-6 space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

export default RecentProjects;