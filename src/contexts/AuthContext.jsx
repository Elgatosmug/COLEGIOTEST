import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../lib/authService'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar sesión actual de Supabase Auth
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error al obtener sesión:', error)
          setLoading(false)
          return
        }

        if (session?.user) {
          // Obtener información adicional del usuario
          const userInfo = await authService.getUserInfo(session.user.id)
          const userSession = {
            id: session.user.id,
            email: session.user.email,
            ...userInfo
          }
          setUser(userSession)
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const userInfo = await authService.getUserInfo(session.user.id)
          const userSession = {
            id: session.user.id,
            email: session.user.email,
            ...userInfo
          }
          setUser(userSession)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password, username, cedula, role, additionalData = {}) => {
    try {
      const { data, error } = await authService.signUp(email, password, username, cedula, role, additionalData)
      
      if (error) {
        return { error }
      }
      
      // El usuario se establecerá automáticamente a través del listener de auth state
      return { data, error }
    } catch (error) {
      return { error: { message: 'Error inesperado: ' + error.message } }
    }
  }

  const signIn = async (email, password) => {
    try {
      const { data, error } = await authService.signIn(email, password)
      
      if (error) {
        return { error }
      }
      
      // El usuario se establecerá automáticamente a través del listener de auth state
      return { data, error }
    } catch (error) {
      return { error: { message: 'Error inesperado: ' + error.message } }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await authService.signOut()
      
      if (error) {
        return { error }
      }
      
      // El usuario se limpiará automáticamente a través del listener de auth state
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

      const { data, error } = await authService.changePassword(newPassword)
      
      if (error) {
        return { error }
      }
      
      return { data, error }
    } catch (error) {
      return { error: { message: 'Error inesperado: ' + error.message } }
    }
  }

  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      
      if (error) {
        return { error }
      }
      
      return { 
        data: { 
          message: 'Se ha enviado un enlace de recuperación a tu correo electrónico' 
        } 
      }
    } catch (error) {
      return { error: { message: 'Error al enviar correo de recuperación' } }
    }
  }

  // Función para iniciar sesión con Google
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await authService.signInWithGoogle()
      
      if (error) {
        return { error }
      }
      
      return { data, error: null }
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