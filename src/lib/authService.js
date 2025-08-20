// ARCHIVO COMENTADO PARA PRUEBAS SIN SUPABASE
// import { supabase } from './supabase'
// import { validators } from './validators.js'
// import { SECURITY_CONFIG } from './config.js'

// Servicio mock para pruebas sin Supabase
export const authService = {
  // Iniciar sesión con Google
  async signInWithGoogle() {
    console.log('🔧 Mock: Iniciando sesión con Google')
    return { data: { user: { id: 'google-1', email: 'google@test.com' } } }
  },

  // Iniciar sesión
  async signIn(email, password) {
    console.log('🔧 Mock: Intentando iniciar sesión con:', email)
    
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Credenciales mock
    const mockUsers = {
      'estudiante@test.com': { id: '1', email: 'estudiante@test.com', role: 'estudiante' },
      'representante@test.com': { id: '2', email: 'representante@test.com', role: 'representante' },
      'profesor@test.com': { id: '3', email: 'profesor@test.com', role: 'profesor' },
      'admin@test.com': { id: '4', email: 'admin@test.com', role: 'administrador' }
    }
    
    if (mockUsers[email] && password === '123456') {
      return { data: { user: mockUsers[email] } }
    } else {
      return { error: { message: 'Credenciales inválidas' } }
    }
  },

  // Registrar usuario
  async signUp(email, password, username, cedula, role, additionalData = {}) {
    console.log('🔧 Mock: Registrando usuario:', email)
    
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser = {
      id: Date.now().toString(),
      email,
      username,
      cedula,
      role,
      ...additionalData
    }
    
    return { data: newUser }
  },

  // Cerrar sesión
  async signOut() {
    console.log('🔧 Mock: Cerrando sesión')
    return { error: null }
  },

  // Cambiar contraseña
  async changePassword(newPassword) {
    console.log('🔧 Mock: Cambiando contraseña')
    return { data: { message: 'Contraseña cambiada exitosamente' } }
  },

  // Obtener información del usuario
  async getUserInfo(userId) {
    console.log('🔧 Mock: Obteniendo información del usuario:', userId)
    
    const mockUserInfo = {
      '1': { username: 'Estudiante Test', role: 'estudiante', jornada: 1 },
      '2': { username: 'Representante Test', role: 'representante' },
      '3': { username: 'Profesor Test', role: 'profesor' },
      '4': { username: 'Administrador Test', role: 'administrador' }
    }
    
    return mockUserInfo[userId] || { username: 'Usuario Test', role: 'estudiante' }
  }
}