import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

const BASE_URL = 'http://localhost:3000'

// Crear instancia de axios
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - agregar token a las peticiones
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - manejar renovación de tokens
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Si el error es 401 y no hemos intentado renovar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')

        if (!refreshToken) {
          // No hay refresh token, redirigir a login
          localStorage.clear()
          window.location.href = '/auth/login'
          return Promise.reject(error)
        }

        // Intentar renovar el token
        const response = await axios.post(`${BASE_URL}/api/auth/refresh`, {
          refreshToken,
        })

        const { accessToken } = response.data

        // Guardar el nuevo token
        localStorage.setItem('accessToken', accessToken)

        // Reintentar la petición original con el nuevo token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
        }
        return api(originalRequest)
      } catch (refreshError) {
        // Si falla la renovación, limpiar y redirigir a login
        localStorage.clear()
        window.location.href = '/auth/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
