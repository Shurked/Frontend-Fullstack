import React, { createContext, useContext, useState, ReactNode } from 'react'
import type { ProjectResponse, TemplateDataResponse } from '../types.api'

interface ProjectContextType {
  currentProject: ProjectResponse | null
  currentTemplate: TemplateDataResponse | null
  setCurrentProject: (project: ProjectResponse | null) => void
  setCurrentTemplate: (template: TemplateDataResponse | null) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<ProjectResponse | null>(null)
  const [currentTemplate, setCurrentTemplate] = useState<TemplateDataResponse | null>(null)

  const value: ProjectContextType = {
    currentProject,
    currentTemplate,
    setCurrentProject: (project) => {
      setCurrentProject(project)
      if (project?.template) {
        setCurrentTemplate(project.template)
      }
    },
    setCurrentTemplate,
  }

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProject debe usarse dentro de ProjectProvider')
  }
  return context
}
