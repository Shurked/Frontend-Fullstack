import React, { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectDetails, ProjectTab } from './types';
import ConfigTab from './ConfigTab';
import SummaryTab from './SummaryTab';
import { BoardView } from '../panel';
import { getProject } from '../services/projects.service';
import { getTasks } from '../../projects/services/tasks.service';

// Datos mock (en producción vendrían de una API)
const mockProjectData: ProjectDetails = {
  id: '1',
  name: 'Plataforma de Desarrollo',
  type: 'Scrum',
  lead: {
    name: 'Jorge C. Bardales',
    avatar: 'https://ui-avatars.com/api/?name=Jorge+Bardales&background=4931A9&color=fff',
  },
  stats: {
    completed: 0,
    updated: 0,
    created: 0,
    duesSoon: 0,
  },
  statusBreakdown: {
    inProgress: 0,
    inReview: 0,
    toDo: 0,
  },
  recentActivity: [
    {
      id: '1',
      user: {
        name: 'Juan Pérez',
        avatar: 'https://ui-avatars.com/api/?name=Juan+Perez&background=4931A9&color=fff',
        initials: 'JP',
      },
      action: 'actualizó el campo estado en 🟢 Creación del inicio de sesión',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
      type: 'status_change',
    },
  ],
};

const ProjectSummary: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState<ProjectTab>('summary');
  
  // En producción, cargarías los datos del proyecto basándote en projectId
  const [project, setProject] = useState<ProjectDetails>(mockProjectData);

  // Load project details and recent activity from backend on mount / projectId change
  React.useEffect(() => {
    if (!projectId) return;

    let mounted = true
    ;(async () => {
      try {
        // fetch project basic info
        const p = await getProject(projectId)
        if (!mounted) return

        // map returned project info into our ProjectDetails partially
        setProject(prev => ({
          ...prev,
          id: p.id ?? prev.id,
          name: p.name ?? prev.name,
          lead: {
            name: p.createdByName ?? prev.lead.name,
            avatar: p.createdByEmail ? `https://ui-avatars.com/api/?name=${encodeURIComponent(p.createdByName||p.createdByEmail)}&background=4931A9&color=fff` : prev.lead.avatar,
          }
        }))

        // fetch tasks for the project and compute status breakdown + recent activity
        const tasks = await getTasks(projectId)
        if (!mounted) return

        const toDo = tasks.filter((t:any) => (t.status ?? 'todo') === 'todo').length
        const inProgress = tasks.filter((t:any) => (t.status ?? 'todo') === 'in-progress').length
        const inReview = tasks.filter((t:any) => (t.status ?? 'todo') === 'in-review').length

        // recent activity: take last 8 events based on createdAt/updatedAt
        const activities = (tasks || [])
          .map((t:any) => ({
            id: t.id,
            user: {
              name: t.reportedBy?.completeName ?? t.reportedBy?.name ?? (t.creator?.name ?? 'Desconocido'),
              avatar: t.reportedBy?.avatar ?? '',
              initials: (t.reportedBy?.completeName ?? t.reportedBy?.name ?? (t.creator?.name ?? 'D')).split(' ').map((n:string)=>n[0]).join('').toUpperCase().substring(0,2),
            },
            action: `creó la tarea "${t.title ?? t.name ?? 'Sin título'}"`,
            timestamp: new Date(t.createdAt ?? t.updatedAt ?? Date.now()),
            type: 'creation' as const,
          }))
          .sort((a:any,b:any) => +new Date(b.timestamp) - +new Date(a.timestamp))
          .slice(0,8)

        setProject(prev => ({
          ...prev,
          statusBreakdown: { toDo, inProgress, inReview },
          recentActivity: activities,
        }))
      } catch (err) {
        console.error('Error loading project or tasks', err)
      }
    })()

    return () => { mounted = false }
  }, [projectId])

  const handleTaskCreated = useCallback((activity: any) => {
    setProject(prev => ({
      ...prev,
      recentActivity: [activity, ...prev.recentActivity]
    }))
  }, [])

  const handleTasksUpdated = useCallback((tasks: any[]) => {
    const toDo = tasks.filter(t => (t.status ?? 'todo') === 'todo').length
    const inProgress = tasks.filter(t => (t.status ?? 'todo') === 'in_progress').length
    const done = tasks.filter(t => (t.status ?? 'todo') === 'done').length

    setProject(prev => ({
      ...prev,
      statusBreakdown: {
        toDo,
        inProgress,
        inReview: done, // Usando done para inReview temporalmente
      }
    }))
  }, [])

  const handleBack = () => {
    navigate('/dashboard/projects');
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header del proyecto */}
      <div className="mb-6">
        {/* Botón de retroceso y nombre del proyecto */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-[#F4F5F7] rounded-lg transition-colors"
            aria-label="Volver a proyectos"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                stroke="#172B4D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-[#172B4D]">
            {project.name}
          </h1>
        </div>

        {/* Tabs de navegación */}
        <div className="flex gap-1 border-b border-[#DFE1E6]">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === 'summary'
                ? 'text-[#4931A9]'
                : 'text-[#7A869A] hover:text-[#172B4D]'
            }`}
          >
            Resumen
            {activeTab === 'summary' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4931A9]"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('board')}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === 'board'
                ? 'text-[#4931A9]'
                : 'text-[#7A869A] hover:text-[#172B4D]'
            }`}
          >
            Tablero
            {activeTab === 'board' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4931A9]"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === 'config'
                ? 'text-[#4931A9]'
                : 'text-[#7A869A] hover:text-[#172B4D]'
            }`}
          >
            Configuración
            {activeTab === 'config' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4931A9]"></div>
            )}
          </button>
        </div>
      </div>

      {/* Contenido del tab activo */}
      {activeTab === 'summary' ? (
        <SummaryTab project={project} />
      ) : activeTab === 'board' ? (
        <BoardView onTaskCreated={handleTaskCreated} onTasksUpdated={handleTasksUpdated} />
      ) : (
        <ConfigTab />
      )}
    </div>
  );
};

export default ProjectSummary;
