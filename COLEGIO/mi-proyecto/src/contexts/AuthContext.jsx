import { createContext, useContext, useEffect, useState } from 'react'
import { TEST_CONFIG } from '../lib/config.js'

const AuthContext = createContext({})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // Usar configuración centralizada
  const { MOCK_USERS, DEFAULT_PASSWORD, MOCK_DELAY } = TEST_CONFIG

  const signUp = async (email, password, username, cedula, role, additionalData = {}) => {
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
      
      // Verificar si el usuario ya existe
      if (MOCK_USERS[email]) {
        return { error: { message: 'El usuario ya existe' } }
      }

      // Crear nuevo usuario mock
      const newUser = {
        id: Date.now().toString(),
        email,
        username,
        cedula,
        role,
        ...additionalData
      }

      // En un entorno real, aquí se guardaría en la base de datos
      console.log('🔧 Mock: Usuario registrado:', newUser)
      
      return { data: newUser, error: null }
    } catch (error) {
      return { error: { message: 'Error inesperado: ' + error.message } }
    }
  }

  const signIn = async (email, password) => {
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
      
      // Verificar credenciales mock
      if (MOCK_USERS[email] && password === DEFAULT_PASSWORD) {
        const userSession = MOCK_USERS[email]
        setUser(userSession)
        console.log('🔧 Mock: Usuario autenticado:', userSession)
        return { data: userSession, error: null }
      } else {
        return { error: { message: 'Credenciales inválidas' } }
      }
    } catch (error) {
      return { error: { message: 'Error inesperado: ' + error.message } }
    }
  }

  const signOut = async () => {
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY / 2))
      
      setUser(null)
      console.log('🔧 Mock: Usuario desconectado')
      return { error: null }
    } catch (error) {
      return { error: { message: 'Error al cerrar sesión: ' + error.message } }
    }
  }

  const changePassword = async (newPassword) => {
    try {
      if (!user) {
        return { error: { message: 'No hay usuario autenticado' } }
      }

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
      
      console.log('🔧 Mock: Contraseña cambiada para:', user.email)
      return { data: { message: 'Contraseña cambiada exitosamente' }, error: null }
    } catch (error) {
      return { error: { message: 'Error inesperado: ' + error.message } }
    }
  }

  const resetPassword = async (email) => {
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
      
      // Verificar si el email existe
      if (MOCK_USERS[email]) {
        console.log('🔧 Mock: Email de recuperación enviado a:', email)
        return { 
          data: { 
            message: 'Se ha enviado un enlace de recuperación a tu correo electrónico' 
          },
          error: null
        }
      } else {
        return { error: { message: 'No se encontró una cuenta con ese email' } }
      }
    } catch (error) {
      return { error: { message: 'Error al enviar correo de recuperación' } }
    }
  }

  const signInWithGoogle = async () => {
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY * 1.5))
      
      // Usuario mock de Google
      const googleUser = {
        id: 'google-1',
        email: 'google@test.com',
        username: 'Usuario Google',
        cedula: '0991435004',
        role: 'estudiante'
      }
      
      setUser(googleUser)
      console.log('🔧 Mock: Usuario autenticado con Google:', googleUser)
      return { data: googleUser, error: null }
    } catch (error) {
      return { error: { message: 'Error inesperado: ' + error.message } }
    }
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    changePassword,
    resetPassword,
    signInWithGoogle
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}