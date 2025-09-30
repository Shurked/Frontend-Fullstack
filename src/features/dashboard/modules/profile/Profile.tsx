import React from 'react';
import { useParams } from 'react-router-dom';
import { Briefcase, MapPin, Building, UserCheck, Phone, Edit } from 'lucide-react';

interface ProfileData {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  color: string;
  trabajo?: string;
  ubicacion?: string;
  organizacion?: string;
  cargo?: string;
  contacto?: string;
  trabajandoEn: Array<{
    id: string;
    titulo: string;
    tipo: string;
    color: string;
  }>;
  proyectosTrabajados: Array<{
    id: string;
    nombre: string;
    color: string;
  }>;
}

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Datos de ejemplo - esto vendría de una API
  const profileData: ProfileData = {
    id: id || '1',
    name: 'Jorge Castañeda Bardales',
    initials: 'JC',
    color: 'bg-orange-500',
    trabajo: 'Desarrollador Full Stack',
    ubicacion: 'Madrid, España',
    organizacion: 'Kuska Tech',
    cargo: 'Senior Developer',
    contacto: '+34 123 456 789',
    trabajandoEn: [
      {
        id: '1',
        titulo: 'Creación del inicio de sesión',
        tipo: 'Plataforma de desarrollo',
        color: 'bg-blue-100'
      },
      {
        id: '2',
        titulo: 'Creación del inicio de sesión',
        tipo: 'Plataforma de desarrollo',
        color: 'bg-blue-100'
      },
      {
        id: '3',
        titulo: 'Creación del inicio de sesión',
        tipo: 'Plataforma de desarrollo',
        color: 'bg-blue-100'
      }
    ],
    proyectosTrabajados: [
      {
        id: '1',
        nombre: 'Plataforma de Desarrollo',
        color: 'bg-purple-500'
      }
    ]
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header con imagen de fondo */}
      <div className="relative">
        {/* Imagen de fondo */}
        <div className="h-64 bg-gradient-to-r from-slate-500 to-slate-600 relative">
          {/* Ícono de editar */}
          <button className="absolute top-4 right-4 p-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors">
            <Edit className="w-5 h-5" />
          </button>
        </div>
        
        {/* Avatar superpuesto */}
        <div className="absolute -bottom-16 left-8">
          <div className={`w-32 h-32 ${profileData.color} rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg`}>
            {profileData.initials}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 px-8 pt-20 pb-8">
        {/* Nombre */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{profileData.name}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Acerca de */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Acerca de</h2>
              
              <div className="space-y-4">
                {profileData.trabajo && (
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Tu trabajo</p>
                      <p className="text-gray-900">{profileData.trabajo}</p>
                    </div>
                  </div>
                )}

                {profileData.ubicacion && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Tu ubicación</p>
                      <p className="text-gray-900">{profileData.ubicacion}</p>
                    </div>
                  </div>
                )}

                {profileData.organizacion && (
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Tu organización</p>
                      <p className="text-gray-900">{profileData.organizacion}</p>
                    </div>
                  </div>
                )}

                {profileData.cargo && (
                  <div className="flex items-center space-x-3">
                    <UserCheck className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Tu cargo</p>
                      <p className="text-gray-900">{profileData.cargo}</p>
                    </div>
                  </div>
                )}

                {profileData.contacto && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Tu contacto</p>
                      <p className="text-gray-900">{profileData.contacto}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna derecha - Trabajando en y Proyectos */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trabajando en */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Trabajando en</h2>
              <div className="space-y-3">
                {profileData.trabajandoEn.map((task) => (
                  <div key={task.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{task.titulo}</h3>
                      <p className="text-sm text-gray-500">{task.tipo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Proyectos trabajados */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Proyectos trabajados</h2>
              <div className="grid gap-4">
                {profileData.proyectosTrabajados.map((project) => (
                  <div key={project.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className={`w-10 h-10 ${project.color} rounded flex items-center justify-center`}>
                      <div className="w-6 h-6 bg-white rounded"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{project.nombre}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;