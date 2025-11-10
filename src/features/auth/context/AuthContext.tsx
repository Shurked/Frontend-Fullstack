import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AuthState, User, LoginCredentials, RegisterCredentials } from '../types/auth.types'
import authService from '../services/auth.service'

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => Promise<void>
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,
  })

  // Inicializar estado de autenticación
  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getAccessToken()

      if (token) {
        try {
          const user = await authService.getCurrentUser()
          setAuthState({
            user,
            accessToken: token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          console.error('Error fetching user:', error)
          setAuthState({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      } else {
        setAuthState({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials)
      setAuthState({
        user: response.user,
        accessToken: response.accessToken,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await authService.register(credentials)
      setAuthState({
        user: response.user,
        accessToken: response.accessToken,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } finally {
      setAuthState({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  }

  const updateUser = (user: User) => {
    setAuthState(prev => ({
      ...prev,
      user,
    }))
  }

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
