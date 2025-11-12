import React, { useState } from 'react'
import type { Task } from './types'
import { updateTask } from '../services/tasks.service'

interface Props {
  task: Task
  projectId: string
  onClose: () => void
  onSaved: (task: Task) => void
}

const EditTaskModal: React.FC<Props> = ({ task, projectId, onClose, onSaved }) => {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description ?? '')
  const [status, setStatus] = useState(task.status ?? 'todo')
  const [priority, setPriority] = useState((task.priority as string) ?? 'medium')
  const [assignedTo, setAssignedTo] = useState(task.assignee?.name ?? '')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!title.trim()) return setError('El título es requerido')
    setIsLoading(true)
    try {
      const payload: any = {
        title,
        description,
        status,
        priority: priority === 'medium' ? 'media' : priority,
      }
      if (assignedTo.trim()) payload.assignedToId = assignedTo.trim()

      const updated = await updateTask(task.id, payload)

      const uiTask: Task = {
        id: updated.id ?? task.id,
        title: updated.title ?? title,
        description: updated.description ?? description,
        status: updated.status ?? status,
        priority: (updated.priority === 'media' ? 'medium' : (updated.priority as any)) || priority,
        assignee: updated.assignedTo ?? (task.assignee ? task.assignee : undefined),
        creator: task.creator,
      }

      onSaved(uiTask)
      onClose()
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Error al actualizar tarea')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 z-10 w-full max-w-lg">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Editar Tarea</h3>
            <p className="text-sm text-[#7A869A]">Modifica los detalles de la tarea.</p>
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
                <option value="todo">Por Hacer</option>
                <option value="in-progress">En Progreso</option>
                <option value="in-review">En Revisión</option>
                <option value="done">Hecho</option>
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
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-[#0F1724] text-white rounded">{isLoading ? 'Guardando...' : 'Guardar cambios'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTaskModal
