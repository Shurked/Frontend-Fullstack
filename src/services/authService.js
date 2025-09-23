import { apiService } from './apiService';

// Servicio de autenticación
export const authService = {
  // Simular login (reemplazar con API real)
  async login(credentials) {
    // Simulación - reemplazar con llamada real a la API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 1,
            name: credentials.email.split('@')[0],
            email: credentials.email,
          },
          token: 'fake-jwt-token'
        });
      }, 1000);
    });
  },

  // Simular register (reemplazar con API real)
  async register(userData) {
    // Simulación - reemplazar con llamada real a la API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 1,
            name: userData.name,
            email: userData.email,
          },
          token: 'fake-jwt-token'
        });
      }, 1000);
    });
  },

  // Ejemplo de cómo sería con API real:
  /*
  async login(credentials) {
    return apiService.post('/auth/login', credentials);
  },

  async register(userData) {
    return apiService.post('/auth/register', userData);
  },

  async logout() {
    return apiService.post('/auth/logout');
  },

  async refreshToken() {
    return apiService.post('/auth/refresh');
  },
  */
};