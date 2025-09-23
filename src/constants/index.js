// Constantes de rutas
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

// Constantes de autenticación
export const AUTH = {
  TOKEN_KEY: 'auth_token',
  USER_KEY: 'user',
  REFRESH_TOKEN_KEY: 'refresh_token',
};

// Constantes de validación
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_NAME_LENGTH: 50,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Constantes de UI
export const UI = {
  TOAST_DURATION: 3000,
  LOADING_DELAY: 500,
};