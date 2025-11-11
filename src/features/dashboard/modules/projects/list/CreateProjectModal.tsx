import React, { useState } from 'react'
import type { CreateProjectDto } from '../types.api'
import { TEMPLATE_TYPES } from '../constants'
import { createProject } from '../services/projects.service'
import { parseApiErrors } from '../errorUtils'

interface Props {
  onClose: () => void
  onCreated: (created: any) => void
}

const codeRegex = /^[A-Z0-9-]{2,10}$/

const CreateProjectModal: React.FC<Props> = ({ onClose, onCreated }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [code, setCode] = useState('')
  const [type, setType] = useState('SIMPLE')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  function normalizeCode(input: string) {
    return input.trim().toUpperCase().replace(/\s+/g, '-')
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!name.trim() || name.trim().length < 1) e.name = 'Project name is required'
    if (name.trim().length > 255) e.name = 'Name is too long'
    const normalized = normalizeCode(code)
    if (!normalized || normalized.length < 2) e.code = 'Code must be at least 2 characters'
    if (normalized.length > 10) e.code = 'Code must be at most 10 characters'
    if (!codeRegex.test(normalized)) e.code = 'Code must contain only uppercase letters, numbers and hyphens'
    if (description.length > 1000) e.description = 'Description is too long'
    return { e, normalized }
  }

  async function handleSubmit(eve?: React.FormEvent) {
    eve?.preventDefault()
    setErrors({})
    const { e, normalized } = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }
    const dto: CreateProjectDto = {
      name: name.trim(),
      description: description.trim() || undefined,
      code: normalized,
      type: (type as any) || undefined,
    }
    setLoading(true)
    try {
      const res = await createProject(dto)
      onCreated(res)
      onClose()
    } catch (err: any) {
      const parsed = parseApiErrors(err)
      // map field errors to first message
      const fieldErrors: Record<string, string> = {}
      for (const k in parsed.fieldErrors) {
        fieldErrors[k] = parsed.fieldErrors[k][0]
      }
      setErrors(fieldErrors)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Crear proyecto</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-medium">Nombre *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full p-2 border rounded" />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Código *</label>
            <input value={code} onChange={(e) => setCode(e.target.value)} className="mt-1 w-full p-2 border rounded" />
            <p className="text-xs text-gray-500 mt-1">Solo mayúsculas, números y guiones. 2-10 caracteres.</p>
            {errors.code && <p className="text-red-600 text-sm">{errors.code}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Tipo</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 w-full p-2 border rounded">
              {TEMPLATE_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full p-2 border rounded" rows={3} />
            {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white border rounded">Cancelar</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-[#4931A9] text-white rounded">
              {loading ? 'Creando...' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProjectModal
