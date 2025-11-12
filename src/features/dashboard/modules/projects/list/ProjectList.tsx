import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, ProjectFilter } from './types';
import ProjectHeader from './ProjectHeader';
import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';
import CreateProjectModal from './CreateProjectModal';
import { useProjects } from '../services/projects.service';
import { mapProjectResponseToUI } from '../mappers';

const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [showCreate, setShowCreate] = useState(false);

  // Usar React Query con caché automático
  const { data: projectsData, isLoading, isError } = useProjects();

  // Mapear los datos de la API al formato UI
  const projects: Project[] = useMemo(() => {
    if (!projectsData) return [];
    if (Array.isArray(projectsData)) {
      return projectsData.map(mapProjectResponseToUI);
    }
    return [];
  }, [projectsData]);

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
    // TODO: Implementar API para favoritos y usar mutation
    // Por ahora, esta funcionalidad se maneja en el frontend
    console.log('Toggle favorite:', projectId);
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/dashboard/projects/${projectId}`);
  };

  const handleCreateProject = () => {
    setShowCreate(true)
  }

  function handleCloseCreate() {
    setShowCreate(false)
  }

  function handleCreated(res: any) {
    // React Query invalidará el caché automáticamente
    // cuando se use el hook useCreateProject en CreateProjectModal
    setShowCreate(false)
  }

  // Mostrar estado de carga
  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="text-center py-8">Cargando proyectos...</div>
      </div>
    );
  }

  // Mostrar estado de error
  if (isError) {
    return (
      <div className="p-4 md:p-6">
        <div className="text-center py-8 text-red-600">
          Error al cargar proyectos. Por favor, intenta nuevamente.
        </div>
      </div>
    );
  }

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

      {showCreate && (
        <CreateProjectModal onClose={handleCloseCreate} onCreated={handleCreated} />
      )}

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
