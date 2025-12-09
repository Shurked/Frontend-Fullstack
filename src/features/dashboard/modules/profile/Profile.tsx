import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Building, Phone, Edit, Save, X, User as UserIcon, Loader2, AlertCircle, Zap, Award } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useUserProfile } from './useProfile';
import { validateProfileUpdate } from './validation';
import type { UpdateProfileRequest } from './types';
import api from '../../../auth/services/axios.config';

const Profile: React.FC = () => {
  const { id: profileUserId } = useParams<{ id: string }>();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  // Determinar si es perfil propio o ajeno
  const isOwnProfile = !profileUserId || profileUserId === currentUserId;
  
  const { profile, isLoading, error, updateProfile, isUpdating } = useUserProfile(profileUserId);
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<UpdateProfileRequest>({
    jobTitle: '',
    location: '',
    organization: '',
    phone: '',
    avatar: '',
  });

  // Obtener el ID del usuario actual
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await api.get('/api/auth/me');
        if (response.data?.data?.id) {
          setCurrentUserId(response.data.data.id);
        }
      } catch (err) {
        console.error('Error fetching current user:', err);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (profile?.user) {
      setFormData({
        jobTitle: profile.user.jobTitle || '',
        location: profile.user.location || '',
        organization: profile.user.organization || '',
        phone: profile.user.phone || '',
        avatar: profile.user.avatar || '',
      });
    }
  }, [profile]);

  const handleChange = (field: keyof UpdateProfileRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateProfileUpdate(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await updateProfile(formData);
      setSuccessMessage('¡Perfil actualizado correctamente!');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setValidationErrors({ general: err.message || 'Error al actualizar el perfil' });
    }
  };

  const handleCancel = () => {
    if (profile?.user) {
      setFormData({
        jobTitle: profile.user.jobTitle || '',
        location: profile.user.location || '',
        organization: profile.user.organization || '',
        phone: profile.user.phone || '',
        avatar: profile.user.avatar || '',
      });
    }
    setIsEditing(false);
    setValidationErrors({});
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return name.substring(0, 2);
  };

  const getActivityIcon = (type: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      task_created: <div className="w-3 h-3 bg-blue-500 rounded-full"></div>,
      task_completed: <div className="w-3 h-3 bg-green-500 rounded-full"></div>,
      comment_added: <div className="w-3 h-3 bg-purple-500 rounded-full"></div>,
    };
    return iconMap[type] || <div className="w-3 h-3 bg-gray-500 rounded-full"></div>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#4931A9' }} />
          <p className="text-gray-600 font-medium">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg border-2 border-red-200 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error al cargar el perfil</h2>
          <p className="text-red-600 mb-4">{error?.message || 'No se pudo cargar la información del perfil'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 text-white font-semibold rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#4931A9' }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-xl animate-fade-in flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      <div className="relative">
        <div className="h-72 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="absolute top-6 right-6">
            {isOwnProfile && !isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="group flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-lg rounded-xl text-white hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
              >
                <Edit className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-medium">Editar perfil</span>
              </button>
            ) : isOwnProfile && isEditing ? (
              <div className="flex gap-3">
                <button 
                  onClick={handleSubmit}
                  disabled={isUpdating}
                  className="flex items-center gap-2 px-5 py-3 bg-white text-purple-700 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Guardar cambios</span>
                    </>
                  )}
                </button>
                <button 
                  onClick={handleCancel}
                  disabled={isUpdating}
                  className="px-4 py-3 bg-white/10 backdrop-blur-lg rounded-xl text-white hover:bg-white/20 transition-all duration-300 shadow-lg disabled:opacity-50 border border-white/20"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
        
        <div className="absolute -bottom-20 left-8">
          {profile.user.avatar ? (
            <div className="relative">
              <img 
                src={profile.user.avatar} 
                alt={profile.user.completeName}
                className="w-40 h-40 rounded-2xl border-4 border-white shadow-2xl object-cover"
              />
            </div>
          ) : (
            <div 
              className="w-40 h-40 rounded-2xl flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #4931A9 0%, #6B46C1 100%)' }}
            >
              {getInitials(profile.user.completeName)}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 px-8 pt-24 pb-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-1">{profile.user.completeName}</h1>
          <p className="text-gray-500">{profile.user.email}</p>
        </div>

        {validationErrors.general && (
          <div className="mb-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl flex items-start gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{validationErrors.general}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Acerca de</h2>
              </div>
              
              <div className="space-y-5">
                {isEditing ? (
                  <>
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                        </div>
                        <span>Tu trabajo</span>
                      </label>
                      <input
                        type="text"
                        value={formData.jobTitle}
                        onChange={(e) => handleChange('jobTitle', e.target.value)}
                        placeholder="Ej: Desarrollador Full Stack"
                        maxLength={100}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      />
                      {validationErrors.jobTitle && (
                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                          <span>⚠</span> {validationErrors.jobTitle}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <span>Tu ubicación</span>
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        placeholder="Ej: Madrid, España"
                        maxLength={200}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      />
                      {validationErrors.location && (
                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                          <span>⚠</span> {validationErrors.location}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                          <Building className="w-3.5 h-3.5 text-green-600" />
                        </div>
                        <span>Tu organización</span>
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => handleChange('organization', e.target.value)}
                        placeholder="Ej: Kuska Tech"
                        maxLength={200}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      />
                      {validationErrors.organization && (
                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                          <span>⚠</span> {validationErrors.organization}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center">
                          <Phone className="w-3.5 h-3.5 text-orange-600" />
                        </div>
                        <span>Tu contacto</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+34612345678"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      />
                      <small className="text-gray-500 text-xs mt-1 block">Formato: +[código país][número]</small>
                      {validationErrors.phone && (
                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                          <span>⚠</span> {validationErrors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center">
                          <UserIcon className="w-3.5 h-3.5 text-indigo-600" />
                        </div>
                        <span>Avatar (URL)</span>
                      </label>
                      <input
                        type="url"
                        value={formData.avatar}
                        onChange={(e) => handleChange('avatar', e.target.value)}
                        placeholder="https://example.com/avatar.jpg"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      />
                      {validationErrors.avatar && (
                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                          <span>⚠</span> {validationErrors.avatar}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {!isOwnProfile && (
                      <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl flex items-center gap-2">
                        <UserIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">Estás viendo el perfil de {profile.user.completeName}</span>
                      </div>
                    )}
                    <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 mb-1">Tu trabajo</p>
                        <p className="text-sm font-semibold text-gray-900">{profile.user.jobTitle || <span className="text-gray-400 italic font-normal">No especificado</span>}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 mb-1">Tu ubicación</p>
                        <p className="text-sm font-semibold text-gray-900">{profile.user.location || <span className="text-gray-400 italic font-normal">No especificado</span>}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Building className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 mb-1">Tu organización</p>
                        <p className="text-sm font-semibold text-gray-900">{profile.user.organization || <span className="text-gray-400 italic font-normal">No especificado</span>}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 mb-1">Tu contacto</p>
                        <p className="text-sm font-semibold text-gray-900">{profile.user.phone || <span className="text-gray-400 italic font-normal">No especificado</span>}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Trabajando en</h2>
              </div>
              {profile.currentWork.length > 0 ? (
                <div className="space-y-3">
                  {profile.currentWork.map((work) => (
                    <div key={work.id} className="flex items-start space-x-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getActivityIcon(work.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{work.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{work.projectName}</p>
                        {work.description && (
                          <p className="text-xs text-gray-400 mt-2 line-clamp-2">{work.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-12 text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md mx-auto mb-4 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No hay actividades del día</p>
                  <p className="text-gray-400 text-sm mt-1">Cuando tengas tareas, aparecerán aquí</p>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Proyectos trabajados</h2>
              </div>
              {profile.completedProjects.length > 0 ? (
                <div className="space-y-3">
                  {profile.completedProjects.map((project) => (
                    <div key={project.id} className="flex items-start space-x-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 group">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #4931A9 0%, #6B46C1 100%)' }}
                      >
                        <div className="w-6 h-6 bg-white/90 rounded"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">{project.name}</h3>
                        {project.description && (
                          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{project.description}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-purple-100 text-purple-700 text-xs font-medium">
                            {project.role}
                          </span>
                          {project.completedAt && (
                            <span className="text-xs text-gray-400">
                              {new Date(project.completedAt).toLocaleDateString('es-ES', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-12 text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md mx-auto mb-4 flex items-center justify-center">
                    <Award className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No hay proyectos completados</p>
                  <p className="text-gray-400 text-sm mt-1">Tus proyectos finalizados se mostrarán aquí</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;