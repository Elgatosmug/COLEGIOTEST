import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Footer from './Footer'
import Header from './Header'

const RegisterForm = ({ selectedRole, onBack }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    cedula: '',
    // Campos específicos por rol
    jornada: '',
    representante: '',
    especialidad: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const { signUp } = useAuth()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await signUp(
        formData.email, 
        formData.password, 
        formData.username, 
        formData.cedula,
        selectedRole,
        formData
      )
      
      if (error) {
        setError(error.message)
      } else {
        setMessage('¡Registro exitoso! Redirigiendo al dashboard...')
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    } catch (err) {
      setError('Error inesperado: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const getRoleTitle = () => {
    switch (selectedRole) {
      case 'estudiante': return 'Registro de Estudiante'
      case 'representante': return 'Registro de Representante'
      case 'profesor': return 'Registro de Profesor'
      case 'administrador': return 'Registro de Administrador'
      default: return 'Registro'
    }
  }

  const getRoleDescription = () => {
    switch (selectedRole) {
      case 'estudiante': return 'Completa tus datos para acceder a la plataforma deportiva'
      case 'representante': return 'Regístrate como representante de estudiante'
      case 'profesor': return 'Regístrate como profesor de la institución'
      case 'administrador': return 'Regístrate como administrador del sistema'
      default: return 'Completa tus datos'
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Contenido Principal con Fondo de Aula */}
      <main className="flex-1 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/aula.webp)' }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        
        <div className="relative z-10 min-h-full flex items-center justify-center p-4">
          {/* Formulario de Registro */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
            {/* Logo en el formulario */}
            <div className="flex justify-center mb-6">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-20 h-20 object-contain"
              />
            </div>
            
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
              {getRoleTitle()}
            </h2>
            <p className="text-center text-gray-600 mb-6">
              {getRoleDescription()}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campos básicos */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Nombre de usuario"
                  className="w-full pl-10 pr-3 py-3 border-0 rounded-lg bg-purple-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Correo electrónico"
                  className="w-full pl-10 pr-3 py-3 border-0 rounded-lg bg-purple-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="cedula"
                  value={formData.cedula}
                  onChange={handleInputChange}
                  placeholder="Cédula"
                  className="w-full pl-10 pr-3 py-3 border-0 rounded-lg bg-purple-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Contraseña"
                  className="w-full pl-10 pr-3 py-3 border-0 rounded-lg bg-purple-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirmar contraseña"
                  className="w-full pl-10 pr-3 py-3 border-0 rounded-lg bg-purple-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                  required
                />
              </div>

              {/* Campos específicos por rol */}
              {selectedRole === 'estudiante' && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <select
                    name="jornada"
                    value={formData.jornada}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border-0 rounded-lg bg-purple-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    required
                  >
                    <option value="">Seleccionar jornada</option>
                    <option value="1">Matutina</option>
                    <option value="2">Vespertina</option>
                    <option value="3">Nocturna</option>
                  </select>
                </div>
              )}

              {selectedRole === 'profesor' && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="especialidad"
                    value={formData.especialidad}
                    onChange={handleInputChange}
                    placeholder="Especialidad"
                    className="w-full pl-10 pr-3 py-3 border-0 rounded-lg bg-purple-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    required
                  />
                </div>
              )}

              {/* Mensajes de error y éxito */}
              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              {message && (
                <div className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-lg">
                  {message}
                </div>
              )}

              {/* Botones */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onBack}
                  className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Registrando...' : 'Registrarse'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default RegisterForm 