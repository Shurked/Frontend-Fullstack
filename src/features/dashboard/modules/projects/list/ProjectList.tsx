import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, ProjectFilter } from './types';
import ProjectHeader from './ProjectHeader';
import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';
import CreateProjectModal from './CreateProjectModal';
import { listProjects } from '../services/projects.service';
import { mapProjectResponseToUI } from '../mappers';

// Keep an empty array initially; we'll fetch from API
const mockProjects: Project[] = []

const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await listProjects()
        // res could be ProjectResponse[] or wrapped; map if array
        if (Array.isArray(res)) {
          const ui = res.map(mapProjectResponseToUI)
          if (mounted) setProjects(ui)
        }
      } catch (err) {
        // keep mocks (empty) on error
        console.warn('Could not load projects', err)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

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
    setShowCreate(true)
  }

  function handleCloseCreate() {
    setShowCreate(false)
  }

  function handleCreated(res: any) {
    try {
      const ui = mapProjectResponseToUI(res)
      setProjects((prev) => [ui, ...prev])
    } catch (e) {
      // ignore mapping errors
      setProjects((prev) => prev)
    }
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
