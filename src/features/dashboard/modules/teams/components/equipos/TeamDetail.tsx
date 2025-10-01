import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  Plus, 
  Link as LinkIcon,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { AddLinkModal, CreateTeamModal } from '../modals';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: 'online' | 'offline' | 'busy';
}

interface PinnedLink {
  id: string;
  title: string;
  url: string;
  description?: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  color: string;
  members: TeamMember[];
  pinnedLinks: PinnedLink[];
  createdAt: string;
}

const TeamDetail: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  
  // Estados para modales
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false);
  const [showMemberOptions, setShowMemberOptions] = useState<string | null>(null);
  
  // Datos de ejemplo del equipo
  const [team] = useState<Team>({
    id: teamId || '1',
    name: 'Plataforma de Desarrollo',
    description: 'Equipo encargado del desarrollo de la plataforma principal y sus funcionalidades core.',
    color: 'bg-blue-500',
    createdAt: '15 de Marzo, 2024',
    members: [
      {
        id: '1',
        name: 'Ana García',
        role: 'Team Lead',
        status: 'online'
      },
      {
        id: '2',
        name: 'Carlos López',
        role: 'Frontend Developer',
        status: 'online'
      },
      {
        id: '3',
        name: 'María Rodriguez',
        role: 'Backend Developer',
        status: 'busy'
      },
      {
        id: '4',
        name: 'Luis González',
        role: 'UI/UX Designer',
        status: 'offline'
      }
    ],
    pinnedLinks: [
      {
        id: '1',
        title: 'Documentación del Proyecto',
        url: 'https://docs.example.com',
        description: 'Guías y documentación técnica'
      },
      {
        id: '2',
        title: 'Figma - Diseños UI',
        url: 'https://figma.com/project',
        description: 'Diseños y prototipos actuales'
      }
    ]
  });

  const [pinnedLinks, setPinnedLinks] = useState(team.pinnedLinks);

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: TeamMember['status']) => {
    switch (status) {
      case 'online': return 'En línea';
      case 'busy': return 'Ocupado';
      case 'offline': return 'Desconectado';
      default: return 'Desconectado';
    }
  };

  const handleAddLink = (linkData: { title: string; url: string; description?: string }) => {
    const newLink: PinnedLink = {
      id: Date.now().toString(),
      ...linkData
    };
    setPinnedLinks(prev => [...prev, newLink]);
  };

  const handleRemoveLink = (linkId: string) => {
    setPinnedLinks(prev => prev.filter(link => link.id !== linkId));
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="p-6">
          {/* Botón volver */}
          <button
            onClick={() => navigate('/dashboard/teams')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Equipos</span>
          </button>

          {/* Info del equipo */}
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              {/* Avatar del equipo */}
              <div className={`w-16 h-16 ${team.color} rounded-lg flex items-center justify-center`}>
                <Users className="w-8 h-8 text-white" />
              </div>
              
              {/* Información básica */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{team.name}</h1>
                <p className="text-gray-600 mb-2 max-w-md">{team.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{team.members.length} miembros</span>
                  <span>•</span>
                  <span>Creado el {team.createdAt}</span>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsEditTeamModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3f2890]"
              >
                <Plus className="w-4 h-4" />
                <span>Invitar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Miembros del equipo */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Miembros ({team.members.length})
                  </h2>
                  <button 
                    onClick={() => setIsEditTeamModalOpen(true)}
                    className="flex items-center space-x-2 px-3 py-2 text-[#4931A9] hover:bg-purple-50 rounded-lg text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {team.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        {/* Avatar */}
                        <div className="relative">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          {/* Status indicator */}
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-white`} />
                        </div>

                        {/* Información del miembro */}
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{member.role}</span>
                            <span>•</span>
                            <span>{getStatusText(member.status)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Opciones */}
                      <div className="relative">
                        <button
                          onClick={() => setShowMemberOptions(showMemberOptions === member.id ? null : member.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {showMemberOptions === member.id && (
                          <div className="absolute right-0 top-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg">
                              Ver perfil
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                              Cambiar rol
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg">
                              Remover del equipo
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Links fijados */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Links Fijados</h2>
                  <button 
                    onClick={() => setIsAddLinkModalOpen(true)}
                    className="flex items-center space-x-2 px-3 py-2 text-[#4931A9] hover:bg-purple-50 rounded-lg text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {pinnedLinks.length > 0 ? (
                  <div className="space-y-4">
                    {pinnedLinks.map((link) => (
                      <div
                        key={link.id}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <LinkIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 truncate">{link.title}</h3>
                              {link.description && (
                                <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                              )}
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#4931A9] hover:underline mt-1 block truncate"
                              >
                                {link.url}
                              </a>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => handleRemoveLink(link.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <LinkIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No hay links fijados</p>
                    <button 
                      onClick={() => setIsAddLinkModalOpen(true)}
                      className="mt-2 text-[#4931A9] hover:text-[#3f2890] text-sm font-medium"
                    >
                      Agregar el primero
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modales */}
      <AddLinkModal
        isOpen={isAddLinkModalOpen}
        onClose={() => setIsAddLinkModalOpen(false)}
        onAdd={handleAddLink}
      />

      <CreateTeamModal
        isOpen={isEditTeamModalOpen}
        onClose={() => setIsEditTeamModalOpen(false)}
        editTeam={{
          id: team.id,
          name: team.name,
          description: team.description,
          color: team.color,
          members: team.members
        }}
        onSave={(updatedTeam) => {
          console.log('Updating team:', updatedTeam);
          setIsEditTeamModalOpen(false);
        }}
      />
    </div>
  );
};

export default TeamDetail;