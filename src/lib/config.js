// Configuración centralizada del sistema
export const SECURITY_CONFIG = {
  // Configuración de contraseñas
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REQUIRE_UPPERCASE: true,
  PASSWORD_REQUIRE_LOWERCASE: true,
  PASSWORD_REQUIRE_NUMBERS: true,
  PASSWORD_REQUIRE_SPECIAL: true,
  
  // Configuración de rate limiting
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutos en milisegundos
  
  // Configuración de sesión
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
  
  // Configuración de validación
  STRICT_VALIDATION: false, // Cambiado a false para modo de pruebas
  SANITIZE_INPUTS: true,
  
  // Configuración de logs
  ENABLE_SECURITY_LOGS: true,
  LOG_LEVEL: 'info' // 'debug', 'info', 'warn', 'error'
}

export const VALIDATION_CONFIG = {
  // Configuración de email
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  EMAIL_MAX_LENGTH: 254,
  
  // Configuración de cédula ecuatoriana
  CEDULA_LENGTH: 10,
  CEDULA_REGEX: /^\d{10}$/,
  
  // Configuración de nombres
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  NAME_REGEX: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
  
  // Configuración de roles
  VALID_ROLES: ['estudiante', 'representante', 'profesor', 'administrador'],
  
  // Configuración de jornadas
  VALID_JORNADAS: [1, 2],
  
  // Configuración de categorías
  VALID_CATEGORIAS: ['escolar', 'colegial']
}

export const APP_CONFIG = {
  // Configuración de la aplicación
  APP_NAME: 'Plataforma Deportes',
  INSTITUTION: 'Unidad Educativa Fiscal Ismael Perez Pazmiño',
  
  // Configuración de URLs
  BASE_URL: import.meta.env.VITE_BASE_URL || 'http://localhost:5173',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  
  // Configuración de desarrollo
  IS_DEVELOPMENT: import.meta.env.DEV,
  ENABLE_MOCK_AUTH: true, // Habilitado para modo de pruebas
  
  // Configuración de features
  ENABLE_GOOGLE_AUTH: true,
  ENABLE_PASSWORD_RESET: true,
  ENABLE_REGISTRATION: true
}

// Configuración específica para modo de pruebas
export const TEST_CONFIG = {
  MOCK_USERS: {
    'estudiante@test.com': {
      id: '1',
      email: 'estudiante@test.com',
      username: 'Estudiante Test',
      cedula: '0991435000',
      role: 'estudiante',
      jornada: 1
    },
    'representante@test.com': {
      id: '2',
      email: 'representante@test.com',
      username: 'Representante Test',
      cedula: '0991435001',
      role: 'representante'
    },
    'profesor@test.com': {
      id: '3',
      email: 'profesor@test.com',
      username: 'Profesor Test',
      cedula: '0991435002',
      role: 'profesor'
    },
    'admin@test.com': {
      id: '4',
      email: 'admin@test.com',
      username: 'Administrador Test',
      cedula: '0991435003',
      role: 'administrador'
    }
  },
  DEFAULT_PASSWORD: '123456',
  MOCK_DELAY: 1000 // Delay en milisegundos para simular red
} 