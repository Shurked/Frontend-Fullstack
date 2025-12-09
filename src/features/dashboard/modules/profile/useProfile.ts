import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfile, updateProfile } from './profile.service';
import type { UpdateProfileRequest } from './types';

export function useUserProfile() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ['userProfile'],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateProfile(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['userProfile'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          user: updatedUser,
        };
      });
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    error: profileQuery.error,
    refetch: profileQuery.refetch,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    updateError: updateProfileMutation.error,
  };
}
