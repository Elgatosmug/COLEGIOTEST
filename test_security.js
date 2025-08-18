// Script de prueba de seguridad
import { validators } from './src/lib/authService.js'

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

console.log('\n✅ Pruebas completadas!')
console.log('📋 Verifica que todos los inputs maliciosos fueron bloqueados.') 