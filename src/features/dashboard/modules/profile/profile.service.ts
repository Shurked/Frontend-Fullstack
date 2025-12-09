import { api } from '../../../auth/services/axios.config';
import type { UserProfile, UpdateProfileRequest, ApiResponse, UserBasicInfo } from './types';

export async function getProfile(userId?: string): Promise<UserProfile> {
  // Si hay userId, obtener perfil de ese usuario; si no, obtener perfil propio
  const endpoint = userId ? `/api/users/profile/${userId}` : '/api/users/profile';
  const response = await api.get<ApiResponse<UserProfile>>(endpoint);

  if (!response.data.success || !response.data.data) {
    throw new Error('Failed to fetch user profile');
  }

  return response.data.data;
}

export async function updateProfile(data: UpdateProfileRequest): Promise<UserBasicInfo> {
  const response = await api.patch<ApiResponse<UserBasicInfo>>(
    '/api/users/profile',
    data
  );

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || 'Failed to update profile');
  }

  return response.data.data;
}
