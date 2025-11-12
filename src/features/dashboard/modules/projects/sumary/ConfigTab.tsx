import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import type { MemberResponse } from '../types.api'
import { 
  useProject, 
  useAddProjectMember, 
  useUpdateProjectMemberRole, 
  useRemoveProjectMember 
} from '../services/projects.service'

const roles = ['ADMIN', 'MEMBER', 'READER']

const ConfigTab: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('MEMBER')
  const [error, setError] = useState<string | null>(null)

  // React Query hooks con caché automático
  const { data: project, isLoading } = useProject(projectId)
  const addMemberMutation = useAddProjectMember(projectId!)
  const updateRoleMutation = useUpdateProjectMemberRole(projectId!)
  const removeMemberMutation = useRemoveProjectMember(projectId!)

  async function handleAddMember(e?: React.FormEvent) {
    e?.preventDefault()
    setError(null)
    if (!projectId) return
    if (!email.includes('@')) { 
      setError('Email inválido')
      return 
    }
    
    try {
      await addMemberMutation.mutateAsync({ email: email.trim(), role })
      setEmail('')
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Error agregando miembro')
    }
  }

  async function handleChangeRole(memberId: string, newRole: string) {
    if (!projectId) return
    setError(null)
    
    try {
      await updateRoleMutation.mutateAsync({ memberId, role: newRole })
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Error actualizando rol')
    }
  }

  async function handleRemove(memberId: string) {
    if (!projectId) return
    setError(null)
    
    try {
      await removeMemberMutation.mutateAsync(memberId)
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Error eliminando miembro')
    }
  }

  if (isLoading) return <div>Cargando configuración...</div>

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-3">Configuración del proyecto</h2>
      {project ? (
        <div>
          <section className="mb-6">
            <h3 className="font-medium">Información</h3>
            <p className="text-sm text-gray-600">Código: {project.code}</p>
            <p className="text-sm text-gray-600">Tipo: {project.type}</p>
            <p className="text-sm text-gray-600">Estado: {project.status}</p>
          </section>

          <section className="mb-6">
            <h3 className="font-medium mb-2">Miembros</h3>
            {project.members && project.members.length ? (
              <ul className="space-y-2">
                {project.members.map((m: MemberResponse) => (
                  <li key={m.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{m.userCompleteName || m.userEmail}</div>
                      <div className="text-xs text-gray-500">{m.userEmail}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select value={m.role} onChange={(e) => handleChangeRole(m.id, e.target.value)} className="p-1 border rounded">
                        {roles.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <button onClick={() => handleRemove(m.id)} className="text-red-600">Eliminar</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No hay miembros aún.</p>
            )}
          </section>

          <section>
            <h3 className="font-medium mb-2">Agregar miembro</h3>
            <form onSubmit={handleAddMember} className="flex gap-2 items-center">
              <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email@ejemplo.com" className="p-2 border rounded flex-1" />
              <select value={role} onChange={(e)=>setRole(e.target.value)} className="p-2 border rounded">
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <button type="submit" className="px-3 py-2 bg-[#4931A9] text-white rounded">Agregar</button>
            </form>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </section>
        </div>
      ) : (
        <p>No se pudo cargar la configuración del proyecto.</p>
      )}
    </div>
  )
}

export default ConfigTab
