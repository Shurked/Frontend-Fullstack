import api from './axios.config'
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types/auth.types'

class AuthService {
  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/api/auth/login', credentials)
    // backend may wrap tokens under response.data.data or directly under response.data
    const accessToken = response.data?.data?.accessToken ?? response.data?.accessToken
    const refreshToken = response.data?.data?.refreshToken ?? response.data?.refreshToken
    this.setTokens(accessToken, refreshToken)
    return response.data
  }

  // Register
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post('/api/auth/register', credentials)
    const accessToken = response.data?.data?.accessToken ?? response.data?.accessToken
    const refreshToken = response.data?.data?.refreshToken ?? response.data?.refreshToken
    this.setTokens(accessToken, refreshToken)
    return response.data
  }

  // Refresh token
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await api.post('/api/auth/refresh', { refreshToken })
    const accessToken = response.data?.data?.accessToken ?? response.data?.accessToken
    if (accessToken) this.setTokens(accessToken, refreshToken)
    return { accessToken }
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/api/auth/me')
    return response.data
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await api.post('/api/auth/logout')
    } finally {
      this.clearTokens()
    }
  }

  // Token management
  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

  private clearTokens(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken')
  }

  // Get stored tokens
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken')
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken')
  }
}

export default new AuthService()
