// Configuración de seguridad centralizada
export const SECURITY_CONFIG = {
  // Configuración de seguridad del cliente (sin secrets)
  PASSWORD_MIN_LENGTH: 8,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutos en millisegundos
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000 // 24 horas
}

// Configuración de la aplicación
export const APP_CONFIG = {
  APP_NAME: 'Unidad Educativa Fiscal Ismael Perez Pazmiño',
  APP_VERSION: '1.0.0',
  ENVIRONMENT: (() => {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env.MODE || 'development'
    }
    return process.env.NODE_ENV || 'development'
  })()
}

// Configuración de validación
export const VALIDATION_CONFIG = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  CEDULA_REGEX: /^\d{10}$/,
  PASSWORD_REGEX: {
    UPPERCASE: /[A-Z]/,
    LOWERCASE: /[a-z]/,
    NUMBERS: /\d/,
    SPECIAL_CHARS: /[!@#$%^&*(),.?":{}|<>]/
  },
  PROVINCE_RANGE: { MIN: 1, MAX: 24 },
  CEDULA_COEFFICIENTS: [2, 1, 2, 1, 2, 1, 2, 1, 2]
}

// Configuración de sanitización
export const SANITIZATION_CONFIG = {
  HTML_TAGS: /[<>]/g,
  SQL_DANGEROUS: /['";]/g,
  SQL_COMMENTS: /--/g,
  SQL_MULTILINE_COMMENTS: /\/\*/g,
  SQL_MULTILINE_COMMENTS_END: /\*\//g,
  NON_DIGITS: /\D/g
} 