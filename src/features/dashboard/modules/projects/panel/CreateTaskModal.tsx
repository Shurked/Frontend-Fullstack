import React, { useState } from 'react'
import type { Task } from './types'
import { useAuth } from '../../../../auth/context/AuthContext'
import { useCreateTask } from '../services/tasks.service'

interface Props {
  columnId: string
  projectId: string
  onClose: () => void
  onCreated: (task: Task) => void
}

const CreateTaskModal: React.FC<Props> = ({ columnId, projectId, onClose, onCreated }) => {
  const { user: authUser } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('todo')
  const [priority, setPriority] = useState('medium')
  const [assignedTo, setAssignedTo] = useState('')
  const [error, setError] = useState<string | null>(null)

  // React Query mutation
  const createTaskMutation = useCreateTask(projectId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!title.trim()) return setError('El título es requerido')
    
    try {
      const payload: any = {
        projectId,
        title,
        description,
        status,
        priority: priority === 'medium' ? 'media' : priority,
      }
      if (assignedTo.trim()) payload.assignedToId = assignedTo.trim()

      const created = await createTaskMutation.mutateAsync(payload)

      // Build UI task with creator info from Auth
      const creatorName = authUser?.completeName ?? 'Tú'
      const initials = creatorName.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0,2)

      const newTask: Task = {
        id: created.id,
        title: created.title,
        priority: (created.priority === 'media' ? 'medium' : (created.priority as any)) || undefined,
        assignee: created.assignedToId ? { name: 'Asignado', avatar: '', initials: 'A' } : undefined,
        creator: { name: creatorName, initials },
      }

      onCreated(newTask)
      onClose()
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Error al crear tarea')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 z-10 w-full max-w-lg">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Crear Nueva Tarea</h3>
            <p className="text-sm text-[#7A869A]">Agrega una nueva tarea al tablero del proyecto.</p>
          </div>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Título de la Tarea *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ej: Implementar sistema de autenticación" className="w-full border rounded px-3 py-2 bg-[#F8F9FB]" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe los detalles de la tarea..." className="w-full border rounded px-3 py-2 h-24 bg-[#F8F9FB]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border rounded px-3 py-2 bg-[#F8F9FB]">
                <option value="backlog">Backlog</option>
                <option value="todo">Por Hacer</option>
                <option value="in_progress">En Progreso</option>
                <option value="done">Completado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Prioridad</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} className="w-full border rounded px-3 py-2 bg-[#F8F9FB]">
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="low">Baja</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Asignado a (opcional)</label>
            <input value={assignedTo} onChange={e => setAssignedTo(e.target.value)} placeholder="Nombre del responsable" className="w-full border rounded px-3 py-2 bg-[#F8F9FB]" />
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
            <button type="submit" disabled={createTaskMutation.isPending} className="px-4 py-2 bg-[#0F1724] text-white rounded">
              {createTaskMutation.isPending ? 'Creando...' : 'Crear Tarea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTaskModal
