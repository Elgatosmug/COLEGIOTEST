import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Header from './Header'
import Footer from './Footer'

const Dashboard = () => {
  const { user, signOut } = useAuth()

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
          {/* Contenido del Dashboard */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Bienvenido a la Plataforma de Deportes
            </h2>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Usuario:</span> {user?.email}
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Actividades Deportivas</h3>
                  <p className="text-gray-700 mb-4">Consulta las actividades deportivas disponibles y sus horarios.</p>
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Ver Actividades
                  </button>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Mis Inscripciones</h3>
                  <p className="text-gray-700 mb-4">Revisa las actividades en las que estás inscrito.</p>
                  <button className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Ver Inscripciones
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">Eventos Deportivos</h3>
                  <p className="text-gray-700 mb-4">Consulta los próximos eventos deportivos de la institución.</p>
                  <button className="bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                    Ver Eventos
                  </button>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                  <h3 className="text-xl font-semibold text-orange-800 mb-3">Mi Perfil</h3>
                  <p className="text-gray-700 mb-4">Actualiza tu información personal y preferencias.</p>
                  <button className="bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                    Editar Perfil
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => signOut()}
                className="bg-red-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard