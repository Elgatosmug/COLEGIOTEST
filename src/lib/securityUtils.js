import { supabase } from './supabase'
import { SECURITY_CONFIG } from './config.js'

// Utilidades de seguridad del cliente (sin secrets)
export const securityUtils = {
  // Validar fortaleza de contraseña (solo validación del cliente)
  validatePasswordStrength: (password) => {
    const minLength = SECURITY_CONFIG.PASSWORD_MIN_LENGTH
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    const score = [
      password.length >= minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar
    ].filter(Boolean).length

    return {
      score,
      maxScore: 5,
      isStrong: score >= 4,
      details: {
        length: password.length >= minLength,
        uppercase: hasUpperCase,
        lowercase: hasLowerCase,
        numbers: hasNumbers,
        specialChars: hasSpecialChar
      }
    }
  },

  // Generar contraseña temporal segura
  generateTemporaryPassword: (length = 12) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let password = ''
    
    // Asegurar que tenga al menos un carácter de cada tipo
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]
    password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]
    password += '0123456789'[Math.floor(Math.random() * 10)]
    password += '!@#$%^&*'[Math.floor(Math.random() * 8)]
    
    // Completar el resto
    for (let i = 4; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)]
    }
    
    // Mezclar la contraseña
    return password.split('').sort(() => Math.random() - 0.5).join('')
  },

  // Encriptar datos sensibles (para uso futuro)
  encryptSensitiveData: (data) => {
    // Implementación básica - en producción usar una librería más robusta
    return btoa(JSON.stringify(data))
  },

  // Desencriptar datos sensibles (para uso futuro)
  decryptSensitiveData: (encryptedData) => {
    try {
      return JSON.parse(atob(encryptedData))
    } catch (error) {
      throw new Error('Error al desencriptar datos')
    }
  }
} 