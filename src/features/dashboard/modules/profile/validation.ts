import type { UpdateProfileRequest } from './types';

export const profileValidation = {
  jobTitle: (value: string) => {
    if (value && value.length > 100) {
      return 'El puesto de trabajo no puede exceder 100 caracteres';
    }
    return null;
  },

  location: (value: string) => {
    if (value && value.length > 200) {
      return 'La ubicación no puede exceder 200 caracteres';
    }
    return null;
  },

  organization: (value: string) => {
    if (value && value.length > 200) {
      return 'La organización no puede exceder 200 caracteres';
    }
    return null;
  },

  phone: (value: string) => {
    if (value === '') return null;

    const phoneRegex = /^\+\d{8,20}$/;
    if (!phoneRegex.test(value)) {
      return 'El teléfono debe comenzar con + seguido del código del país y número (8-20 dígitos)';
    }
    return null;
  },

  avatar: (value: string) => {
    if (value === '') return null;

    try {
      new URL(value);
      if (value.length > 500) {
        return 'La URL del avatar es demasiado larga (máximo 500 caracteres)';
      }
      return null;
    } catch {
      return 'Debe ser una URL válida';
    }
  },
};

export function validateProfileUpdate(data: UpdateProfileRequest): Record<string, string> {
  const errors: Record<string, string> = {};

  if (data.jobTitle !== undefined) {
    const error = profileValidation.jobTitle(data.jobTitle);
    if (error) errors.jobTitle = error;
  }

  if (data.location !== undefined) {
    const error = profileValidation.location(data.location);
    if (error) errors.location = error;
  }

  if (data.organization !== undefined) {
    const error = profileValidation.organization(data.organization);
    if (error) errors.organization = error;
  }

  if (data.phone !== undefined) {
    const error = profileValidation.phone(data.phone);
    if (error) errors.phone = error;
  }

  if (data.avatar !== undefined) {
    const error = profileValidation.avatar(data.avatar);
    if (error) errors.avatar = error;
  }

  return errors;
}
