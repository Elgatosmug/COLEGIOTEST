import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CardContainerAdmin from './card-containerAdmin';
import InscripcionesAdmin from './InscripcionesAdmin';
import AdminPanel from './publicaciones/AdminPanel';

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState('inicio');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { id: 'inicio', label: 'Inicio', href: '/inicio' },
    { id: 'deportes', label: 'Deportes', href: '/deportes' },
    { id: 'inscripciones', label: 'Inscripciones', href: '/inscripciones' },
    { id: 'publicaciones', label: 'Publicaciones', href: '/adminpanel' },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case 'inicio':
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Panel de Administración
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Bienvenido, {user?.username || 'Administrador'}
              </p>
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Funciones de Administración
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">Gestión de Deportes</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Agregar nuevos deportes</li>
                      <li>• Modificar deportes existentes</li>
                      <li>• Eliminar deportes</li>
                      <li>• Gestionar información deportiva</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">Gestión de Inscripciones</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Configurar precios</li>
                      <li>• Gestionar documentos requeridos</li>
                      <li>• Actualizar información de inscripción</li>
                      <li>• Administrar notas importantes</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">Estadísticas</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Ver estadísticas de usuarios</li>
                      <li>• Monitorear inscripciones</li>
                      <li>• Reportes de actividad</li>
                      <li>• Análisis de datos</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">Configuración</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Configuración del sistema</li>
                      <li>• Gestión de usuarios</li>
                      <li>• Configuración de seguridad</li>
                      <li>• Personalización de la plataforma</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'deportes':
        return <CardContainerAdmin />;
      case 'inscripciones':
        return <InscripcionesAdmin />;
      case 'publicaciones':
        return <AdminPanel />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Sección no encontrada</h1>
              <p className="text-xl text-gray-600">La sección solicitada no está disponible.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Navegación */}
      <nav className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    currentSection === item.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user?.username} (Administrador)
              </span>
              <button
                onClick={async () => {
                  await signOut();
                  navigate('/');
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="flex-1 bg-gray-50">
        {renderSection()}
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
