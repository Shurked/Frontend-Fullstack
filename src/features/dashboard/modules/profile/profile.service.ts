import { api } from '../../../auth/services/axios.config';
import type { UserProfile, UpdateProfileRequest, ApiResponse, UserBasicInfo } from './types';

export async function getProfile(): Promise<UserProfile> {
  const response = await api.get<ApiResponse<UserProfile>>('/api/users/profile');

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
