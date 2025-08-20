import { VALIDATION_CONFIG, SECURITY_CONFIG } from './config.js'

// Configuración de sanitización (definida localmente)
const SANITIZATION_CONFIG = {
  HTML_TAGS: /[<>]/g,
  SQL_DANGEROUS: /['";]/g,
  SQL_COMMENTS: /--/g,
  SQL_MULTILINE_COMMENTS: /\/\*/g,
  SQL_MULTILINE_COMMENTS_END: /\*\//g,
  NON_DIGITS: /\D/g
}

// Configuración de regex para contraseñas
const PASSWORD_REGEX = {
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  NUMBERS: /\d/,
  SPECIAL_CHARS: /[!@#$%^&*(),.?":{}|<>]/
}

// Configuración de cédula ecuatoriana
const CEDULA_CONFIG = {
  PROVINCE_RANGE: { MIN: 1, MAX: 24 },
  COEFFICIENTS: [2, 1, 2, 1, 2, 1, 2, 1, 2]
}

// Roles válidos (inmutable)
const VALID_ROLES = Object.freeze(['estudiante', 'representante', 'profesor', 'administrador'])

// Validadores y sanitización
export const validators = {
  // Validar email
  isValidEmail: (email) => {
    return VALIDATION_CONFIG.EMAIL_REGEX.test(email)
  },

  // Validar contraseña fuerte
  isValidPassword: (password) => {
    if (password.length < SECURITY_CONFIG.PASSWORD_MIN_LENGTH) {
      return { 
        valid: false, 
        message: `La contraseña debe tener al menos ${SECURITY_CONFIG.PASSWORD_MIN_LENGTH} caracteres` 
      }
    }
    
    const hasUpperCase = PASSWORD_REGEX.UPPERCASE.test(password)
    const hasLowerCase = PASSWORD_REGEX.LOWERCASE.test(password)
    const hasNumbers = PASSWORD_REGEX.NUMBERS.test(password)
    const hasSpecialChars = PASSWORD_REGEX.SPECIAL_CHARS.test(password)
    
    if (!hasUpperCase) return { 
      valid: false, 
      message: 'La contraseña debe contener al menos una letra mayúscula' 
    }
    if (!hasLowerCase) return { 
      valid: false, 
      message: 'La contraseña debe contener al menos una letra minúscula' 
    }
    if (!hasNumbers) return { 
      valid: false, 
      message: 'La contraseña debe contener al menos un número' 
    }
    if (!hasSpecialChars) return { 
      valid: false, 
      message: 'La contraseña debe contener al menos un carácter especial' 
    }

    return { valid: true }
  },

  // Validar cédula ecuatoriana
  isValidCedula: (cedula) => {
    if (!VALIDATION_CONFIG.CEDULA_REGEX.test(cedula)) return false
    
    const digits = cedula.split('').map(Number)
    const province = parseInt(cedula.substring(0, 2))
    
    if (province < CEDULA_CONFIG.PROVINCE_RANGE.MIN || 
        province > CEDULA_CONFIG.PROVINCE_RANGE.MAX) return false
    
    let sum = 0
    
    for (let i = 0; i < 9; i++) {
      let result = digits[i] * CEDULA_CONFIG.COEFFICIENTS[i]
      if (result > 9) result -= 9
      sum += result
    }
    
    const checkDigit = sum % 10 === 0 ? 0 : 10 - (sum % 10)
    return checkDigit === digits[9]
  },

  // Sanitizar input general
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return input
    return input.trim()
      .replace(SANITIZATION_CONFIG.HTML_TAGS, '') // Remover HTML tags
      .replace(SANITIZATION_CONFIG.SQL_DANGEROUS, '') // Remover caracteres SQL peligrosos
      .replace(SANITIZATION_CONFIG.SQL_COMMENTS, '') // Remover comentarios SQL
      .replace(SANITIZATION_CONFIG.SQL_MULTILINE_COMMENTS, '') // Remover comentarios SQL multilínea
      .replace(SANITIZATION_CONFIG.SQL_MULTILINE_COMMENTS_END, '') // Remover comentarios SQL multilínea
  },

  // Validar y sanitizar email
  sanitizeEmail: (email) => {
    if (!email || typeof email !== 'string') return null
    const sanitized = email.toLowerCase().trim()
    return validators.isValidEmail(sanitized) ? sanitized : null
  },

  // Validar y sanitizar cédula
  sanitizeCedula: (cedula) => {
    if (!cedula || typeof cedula !== 'string') return null
    const sanitized = cedula.trim().replace(SANITIZATION_CONFIG.NON_DIGITS, '') // Solo números
    return validators.isValidCedula(sanitized) ? sanitized : null
  },

  // Validar nombre de usuario
  isValidUsername: (username) => {
    if (!username || typeof username !== 'string') return false
    const sanitized = validators.sanitizeInput(username)
    return sanitized.length >= VALIDATION_CONFIG.NAME_MIN_LENGTH && 
           sanitized.length <= VALIDATION_CONFIG.NAME_MAX_LENGTH &&
           VALIDATION_CONFIG.NAME_REGEX.test(sanitized)
  },

  // Validar que el rol sea válido (más robusto)
  isValidRole: (role) => {
    if (!role || typeof role !== 'string') return false
    return VALID_ROLES.includes(role.toLowerCase())
  },

  // Validar datos específicos por rol
  validateRoleData: (role, data) => {
    if (!validators.isValidRole(role)) {
      return { valid: false, message: 'Rol no válido' }
    }

    switch (role.toLowerCase()) {
      case 'estudiante':
        if (!data.jornada || !VALIDATION_CONFIG.VALID_JORNADAS.includes(data.jornada)) {
          return { valid: false, message: 'Jornada no válida (debe ser 1 o 2)' }
        }
        break
      
      case 'representante':
        // Validaciones específicas para representante si las hay
        break
      
      case 'profesor':
        // Validaciones específicas para profesor si las hay
        break
      
      case 'administrador':
        // Validaciones específicas para administrador si las hay
        break
    }

    return { valid: true }
  }
}

// Utilidades de validación adicionales
export const validationUtils = {
  // Validar formato de fecha
  isValidDate: (dateString) => {
    const date = new Date(dateString)
    return date instanceof Date && !isNaN(date)
  },

  // Validar que un número esté en un rango
  isInRange: (value, min, max) => {
    const num = parseInt(value)
    return !isNaN(num) && num >= min && num <= max
  },

  // Validar que una cadena no esté vacía
  isNotEmpty: (value) => {
    return value && typeof value === 'string' && value.trim().length > 0
  },

  // Validar longitud de cadena
  isValidLength: (value, min, max) => {
    if (!value || typeof value !== 'string') return false
    const length = value.trim().length
    return length >= min && length <= max
  }
} 