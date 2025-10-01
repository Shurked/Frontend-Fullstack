import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, ProjectFilter } from './types';
import ProjectHeader from './ProjectHeader';
import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';

// Datos de ejemplo (esto vendría de una API en producción)
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Plataforma de Desarrollo',
    type: 'Scrum',
    lead: {
      name: 'Jorge C. Bardales',
      avatar: 'https://ui-avatars.com/api/?name=Jorge+Bardales&background=4931A9&color=fff',
    },
    isFavorite: true,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 días atrás
    description: 'Desarrollo de la plataforma principal de gestión de proyectos',
    membersCount: 8,
  },
  {
    id: '2',
    name: 'Diseño UI/UX',
    type: 'Kanban',
    lead: {
      name: 'María González',
      avatar: 'https://ui-avatars.com/api/?name=Maria+Gonzalez&background=5940BA&color=fff',
    },
    isFavorite: false,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
    description: 'Rediseño completo de la interfaz de usuario',
    membersCount: 5,
  },
  {
    id: '3',
    name: 'Backend API',
    type: 'Scrum',
    lead: {
      name: 'Carlos Ruiz',
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Ruiz&background=FFAB00&color=172B4D',
    },
    isFavorite: true,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 horas atrás
    description: 'Desarrollo y mantenimiento de servicios backend',
    membersCount: 12,
  },
  {
    id: '4',
    name: 'Mobile App',
    type: 'Kanban',
    lead: {
      name: 'Ana Pérez',
      avatar: 'https://ui-avatars.com/api/?name=Ana+Perez&background=00C853&color=fff',
    },
    isFavorite: false,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 semana atrás
    description: 'Aplicación móvil multiplataforma con React Native',
    membersCount: 6,
  },
];

const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');

  // Filtrar y buscar proyectos
  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Aplicar filtro
    switch (activeFilter) {
      case 'favorites':
        filtered = filtered.filter((p) => p.isFavorite);
        break;
      case 'recent':
        filtered = filtered.sort(
          (a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime()
        );
        break;
      default:
        break;
    }

    // Aplicar búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.type.toLowerCase().includes(query) ||
          p.lead.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [projects, searchQuery, activeFilter]);

  const handleToggleFavorite = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/dashboard/projects/${projectId}`);
  };

  const handleCreateProject = () => {
    console.log('Crear nuevo proyecto');
    // Aquí se implementaría la lógica para crear un proyecto
  };

  return (
    <div className="p-4 md:p-6">
      <ProjectHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onCreateProject={handleCreateProject}
        projectsCount={filteredProjects.length}
      />

      {filteredProjects.length === 0 ? (
        <EmptyState onCreateProject={handleCreateProject} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onToggleFavorite={handleToggleFavorite}
              onProjectClick={handleProjectClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
