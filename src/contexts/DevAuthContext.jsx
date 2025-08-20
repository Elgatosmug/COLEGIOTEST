import { createContext, useContext, useEffect, useState } from 'react'
import { mockAuthService, isDevelopmentMode } from '../lib/mockAuthService'

const DevAuthContext = createContext({})

export const useDevAuth = () => {
  return useContext(DevAuthContext)
}

export const DevAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Solo activar en modo desarrollo
  const isEnabled = isDevelopmentMode()

  useEffect(() => {
    if (!isEnabled) return

    // Verificar si hay una sesión mock guardada
    const checkMockAuth = async () => {
      try {
        const savedSession = localStorage.getItem('mock-auth-session')
        if (savedSession) {
          const session = JSON.parse(savedSession)
          setUser(session.user)
        }
      } catch (error) {
        console.error('Error al verificar sesión mock:', error)
      } finally {
        setLoading(false)
      }
    }

    checkMockAuth()
  }, [isEnabled])

  const signIn = async (email, password) => {
    if (!isEnabled) {
      return { error: { message: 'Modo desarrollo no activo' } }
    }

    try {
      const { data, error } = await mockAuthService.signIn(email, password)
      
      if (error) {
        return { error }
      }

      // Guardar sesión en localStorage
      localStorage.setItem('mock-auth-session', JSON.stringify(data.session))
      setUser(data.user)
      
      return { data, error: null }
    } catch (error) {
      return { error: { message: 'Error inesperado: ' + error.message } }
    }
  }

  const signUp = async (email, password, username, cedula, role, additionalData = {}) => {
    if (!isEnabled) {
      return { error: { message: 'Modo desarrollo no activo' } }
    }

    try {
      const { data, error } = await mockAuthService.signUp(email, password, username, cedula, role, additionalData)
      
      if (error) {
        return { error }
      }

      // Guardar sesión en localStorage
      localStorage.setItem('mock-auth-session', JSON.stringify(data.session))
      setUser(data.user)
      
      return { data, error: null }
    } catch (error) {
      return { error: { message: 'Error inesperado: ' + error.message } }
    }
  }

  const signOut = async () => {
    if (!isEnabled) {
      return { error: { message: 'Modo desarrollo no activo' } }
    }

    try {
      const { error } = await mockAuthService.signOut()
      
      if (error) {
        return { error }
      }

      // Limpiar sesión
      localStorage.removeItem('mock-auth-session')
      setUser(null)
      
      return { data: { message: 'Sesión cerrada exitosamente' }, error: null }
    } catch (error) {
      return { error: { message: 'Error al cerrar sesión: ' + error.message } }
    }
  }

  const resetPassword = async (email) => {
    if (!isEnabled) {
      return { error: { message: 'Modo desarrollo no activo' } }
    }

    try {
      const { data, error } = await mockAuthService.resetPassword(email)
      return { data, error }
    } catch (error) {
      return { error: { message: 'Error inesperado: ' + error.message } }
    }
  }

  const signInWithGoogle = async () => {
    if (!isEnabled) {
      return { error: { message: 'Modo desarrollo no activo' } }
    }

    try {
      const { data, error } = await mockAuthService.signInWithGoogle()
      
      if (error) {
        return { error }
      }

      // Guardar sesión en localStorage
      localStorage.setItem('mock-auth-session', JSON.stringify(data.session))
      setUser(data.user)
      
      return { data, error: null }
    } catch (error) {
      return { error: { message: 'Error inesperado: ' + error.message } }
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    signInWithGoogle,
    isMockMode: isEnabled
  }

  return (
    <DevAuthContext.Provider value={value}>
      {children}
    </DevAuthContext.Provider>
  )
}
