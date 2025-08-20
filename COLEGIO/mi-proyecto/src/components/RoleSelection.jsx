import { useState } from 'react'
import Footer from './Footer'
import Header from './Header'

const RoleSelection = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState('')

  const roles = [
    { id: 'estudiante', label: 'Estudiante' },
    { id: 'representante', label: 'Representante' },
    { id: 'profesor', label: 'Profesor' },
    { id: 'administrador', label: 'Administrador' }
  ]

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId)
  }

  const handleAccept = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole)
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
          {/* Formulario de Selección de Rol */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
            {/* Logo en el formulario */}
            <div className="flex justify-center mb-6">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-20 h-20 object-contain"
              />
            </div>
            
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Usted es...
            </h2>
            
            <div className="space-y-4 mb-8">
              {roles.map((role) => (
                <label 
                  key={role.id}
                  className="flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:bg-gray-50"
                  style={{
                    borderColor: selectedRole === role.id ? '#3B82F6' : '#E5E7EB',
                    backgroundColor: selectedRole === role.id ? '#EFF6FF' : 'transparent'
                  }}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.id}
                    checked={selectedRole === role.id}
                    onChange={() => handleRoleSelect(role.id)}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-lg font-medium text-gray-900">
                    {role.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Botón de Aceptar */}
            <button
              onClick={handleAccept}
              disabled={!selectedRole}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Aceptar
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default RoleSelection 