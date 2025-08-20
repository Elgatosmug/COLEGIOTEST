import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import RoleSelection from './RoleSelection'
import RegisterForm from './RegisterForm'
import Footer from './Footer'
import Header from './Header'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showRoleSelection, setShowRoleSelection] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState('')
  const [loginMode, setLoginMode] = useState('user') // 'user' o 'admin'
  const navigate = useNavigate();

  const { signIn, resetPassword, signInWithGoogle } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
        const { data, error } = await signIn(email, password)
        if (error) {
          setError(error.message)
        } else if (data) {
          // Redirigir según el rol del usuario
          if (data.role === 'administrador') {
            navigate('/admin-dashboard')
          } else {
            navigate('/user-dashboard')
          }
        }
    } catch (err) {
      setError('Error inesperado: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const { data, error } = await resetPassword(email)
      if (error) {
        setError(error.message)
      } else {
        setSuccess(data.message)
      }
    } catch (err) {
      setError('Error inesperado: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setShowRegister(true)
  }

  const handleBackToLogin = () => {
    setShowRoleSelection(false)
    setShowRegister(false)
    setShowForgotPassword(false)
    setSelectedRole('')
    setError('')
    setSuccess('')
  }

  // Si está mostrando selección de rol
  if (showRoleSelection && !showRegister) {
    return <RoleSelection onRoleSelect={handleRoleSelect} />
  }

  // Si está mostrando formulario de registro
  if (showRegister) {
    return <RegisterForm selectedRole={selectedRole} onBack={handleBackToLogin} />
  }

  // Si está mostrando formulario de olvidé contraseña
  if (showForgotPassword) {
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
            {/* Formulario de Olvidé Contraseña */}
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
                Recuperar Contraseña
              </h2>
              
              <p className="text-gray-600 text-center mb-6">
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
              </p>
              
              <form onSubmit={handleForgotPassword} className="space-y-6">
                {/* Campo Email */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingrese su correo electrónico"
                    className="w-full pl-10 pr-3 py-3 border-0 rounded-lg bg-purple-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    required
                  />
                </div>

                {/* Mensaje de Error */}
                {error && (
                  <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Mensaje de Éxito */}
                {success && (
                  <div className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-lg">
                    {success}
                  </div>
                )}

                {/* Botón de Enviar */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
                </button>

                {/* Botón de Volver */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    ← Volver al inicio de sesión
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
          {/* Formulario de Login */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
            {/* Logo en el formulario */}
            <div className="flex justify-center mb-6">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-40 h-40 object-contain"
              />
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Plataforma Deportes
            </h2>

            {/* Switch de Roles */}
            <div className="mb-6">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setLoginMode('user')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    loginMode === 'user'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Usuarios
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMode('admin')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    loginMode === 'admin'
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Administrador
                </button>
              </div>
            </div>

            {/* Contenido específico según el modo */}
            {loginMode === 'admin' ? (
              // Interfaz para Administrador
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Panel de Administración
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Acceso exclusivo para administradores del sistema
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Campo Email */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email de administrador"
                      className="w-full pl-10 pr-3 py-3 border-0 rounded-lg bg-red-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-colors"
                      required
                    />
                  </div>

                  {/* Campo Contraseña */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña de administrador"
                      className="w-full pl-10 pr-12 py-3 border-0 rounded-lg bg-red-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        )}
                      </svg>
                    </button>
                  </div>

                  {/* Mensaje de Error */}
                  {error && (
                    <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* Botón de Iniciar Sesión */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Accediendo...' : 'Acceder como Administrador'}
                  </button>

                  {/* Información de credenciales de prueba */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">
                      Credenciales de Prueba:
                    </h4>
                    <div className="text-xs text-blue-800 space-y-1">
                      <p><strong>Email:</strong> admin@test.com</p>
                      <p><strong>Contraseña:</strong> 123456</p>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              // Interfaz para Usuarios (estudiante, representante, profesor)
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Acceso de Usuarios
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Para estudiantes, representantes y profesores
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Campo Email */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ingrese correo"
                      className="w-full pl-10 pr-3 py-3 border-0 rounded-lg bg-purple-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                      required
                    />
                  </div>

                  {/* Campo Contraseña */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingrese contraseña"
                      className="w-full pl-10 pr-12 py-3 border-0 rounded-lg bg-purple-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        )}
                      </svg>
                    </button>
                  </div>

                  {/* Mensaje de Error */}
                  {error && (
                    <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* Botón de Iniciar Sesión */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                  </button>

                  {/* Separador */}
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">O continúa con</span>
                    </div>
                  </div>

                  {/* Botón de Google */}
                  <button
                    type="button"
                    onClick={() => {
                      setLoading(true)
                      setError('')
                      signInWithGoogle()
                        .catch(err => {
                          setError('Error al iniciar sesión con Google: ' + err.message)
                          setLoading(false)
                        })
                    }}
                    disabled={loading}
                    className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                      <path fill="none" d="M1 1h22v22H1z" />
                    </svg>
                    Continuar con Google
                  </button>

                  {/* Información de credenciales de prueba */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-green-900 mb-2">
                      Credenciales de Prueba:
                    </h4>
                    <div className="text-xs text-green-800 space-y-1">
                      <p><strong>Estudiante:</strong> estudiante@test.com / 123456</p>
                      <p><strong>Representante:</strong> representante@test.com / 123456</p>
                      <p><strong>Profesor:</strong> profesor@test.com / 123456</p>
                    </div>
                  </div>

                  {/* Enlaces de Ayuda */}
                  <div className="text-center space-y-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium block w-full"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setShowRoleSelection(true)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium block w-full"
                    >
                      ¿No tienes cuenta? Regístrate aquí
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Login