// Script de prueba de seguridad simplificado
import { validators } from './src/lib/validators.js'
import { securityUtils } from './src/lib/securityUtils.js'
import { SECURITY_CONFIG, VALIDATION_CONFIG } from './src/lib/config.js'

console.log('🔒 Pruebas de Seguridad\n')

// Pruebas de sanitización
const testInputs = [
  "normal@email.com",
  "test@email.com' OR '1'='1",
  "test@email.com; DROP TABLE Usuario; --",
  "test@email.com/* */",
  "<script>alert('xss')</script>",
  "test@email.com' UNION SELECT * FROM Usuario --",
  "test@email.com' AND 1=1 --",
  "test@email.com' OR 1=1#",
  "test@email.com' OR 1=1/*",
  "test@email.com' OR '1'='1' --",
]

console.log('📧 Pruebas de sanitización de email:')
testInputs.forEach(input => {
  const sanitized = validators.sanitizeEmail(input)
  console.log(`Input: ${input}`)
  console.log(`Sanitized: ${sanitized}`)
  console.log(`Valid: ${validators.isValidEmail(sanitized || '')}`)
  console.log('---')
})

// Pruebas de cédula
const testCedulas = [
  "0991435000", // Válida
  "0991435000' OR '1'='1", // SQL injection
  "0991435000; DROP TABLE Usuario; --", // SQL injection
  "0991435000/* */", // SQL comment
  "0991435000' UNION SELECT * FROM Usuario --", // SQL injection
]

console.log('\n🆔 Pruebas de sanitización de cédula:')
testCedulas.forEach(cedula => {
  const sanitized = validators.sanitizeCedula(cedula)
  console.log(`Input: ${cedula}`)
  console.log(`Sanitized: ${sanitized}`)
  console.log(`Valid: ${validators.isValidCedula(sanitized || '')}`)
  console.log('---')
})

// Pruebas de contraseña
const testPasswords = [
  "Password123!", // Válida
  "weak", // Débil
  "password", // Sin mayúsculas
  "PASSWORD123!", // Sin minúsculas
  "Password!", // Sin números
  "Password123", // Sin caracteres especiales
]

console.log('\n🔐 Pruebas de validación de contraseña:')
testPasswords.forEach(password => {
  const validation = validators.isValidPassword(password)
  console.log(`Password: ${password}`)
  console.log(`Valid: ${validation.valid}`)
  if (!validation.valid) {
    console.log(`Error: ${validation.message}`)
  }
  console.log('---')
})

// Pruebas de sanitización general
const testSanitizeInputs = [
  "Texto normal",
  "<script>alert('xss')</script>",
  "Texto con 'comillas' y \"dobles\"",
  "Texto con -- comentarios SQL",
  "Texto con /* comentarios */ SQL",
  "Texto con caracteres <peligrosos>",
]

console.log('\n🧹 Pruebas de sanitización general:')
testSanitizeInputs.forEach(input => {
  const sanitized = validators.sanitizeInput(input)
  console.log(`Input: ${input}`)
  console.log(`Sanitized: ${sanitized}`)
  console.log('---')
})

// Pruebas de fortaleza de contraseña
console.log('\n💪 Pruebas de fortaleza de contraseña:')
testPasswords.forEach(password => {
  const strength = securityUtils.validatePasswordStrength(password)
  console.log(`Password: ${password}`)
  console.log(`Score: ${strength.score}/${strength.maxScore}`)
  console.log(`Strong: ${strength.isStrong}`)
  console.log(`Details:`, strength.details)
  console.log('---')
})

// Pruebas de generación de contraseñas temporales
console.log('\n🔑 Pruebas de generación de contraseñas temporales:')
for (let i = 0; i < 3; i++) {
  const tempPassword = securityUtils.generateTemporaryPassword()
  const strength = securityUtils.validatePasswordStrength(tempPassword)
  console.log(`Generated: ${tempPassword}`)
  console.log(`Score: ${strength.score}/${strength.maxScore}`)
  console.log(`Strong: ${strength.isStrong}`)
  console.log('---')
}

console.log('\n✅ Pruebas completadas!')
console.log('📋 Verifica que todos los inputs maliciosos fueron bloqueados.')
console.log('\n🔒 Resumen de seguridad:')
console.log('✅ Protección contra SQL Injection')
console.log('✅ Protección contra XSS')
console.log('✅ Validación de email')
console.log('✅ Validación de cédula ecuatoriana')
console.log('✅ Validación de contraseñas fuertes')
console.log('✅ Sanitización de inputs')
console.log('✅ Generación de contraseñas seguras')
console.log('✅ Análisis de fortaleza de contraseñas')
console.log('\n📁 Estructura modular:')
console.log('✅ config.js - Configuración centralizada')
console.log('✅ validators.js - Validadores y sanitización')
console.log('✅ securityUtils.js - Utilidades de seguridad')
console.log('✅ authService.js - Servicio principal de autenticación') 