import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CardContainer from './card-container';
import Inscripciones from './Inscripciones';
import { PostsList } from './publicaciones/PostsList';

const UserDashboard = () => {
  const [currentSection, setCurrentSection] = useState('inicio');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { id: 'inicio', label: 'Inicio', href: '/inicio' },
    { id: 'deportes', label: 'Deportes', href: '/deportes' },
    { id: 'inscripciones', label: 'Inscripciones', href: '/inscripciones' },
    { id: 'publicaciones', label: 'Publicaciones', href: '/publicaciones' },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case 'inicio':
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Bienvenido, {user?.username || 'Usuario'}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Plataforma Deportiva - {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </p>
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  ¿Qué puedes hacer aquí?
                </h2>
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Explorar Deportes</h3>
                      <p className="text-gray-600">Descubre todos los deportes disponibles y sus detalles</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Gestionar Inscripciones</h3>
                      <p className="text-gray-600">Consulta información sobre precios, documentos y procesos de inscripción</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Seguimiento Personal</h3>
                      <p className="text-gray-600">Mantén un registro de tus actividades deportivas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'deportes':
        return <CardContainer />;
      case 'inscripciones':
        return <Inscripciones />;
      case 'publicaciones':
        return <PostsList />;
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
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user?.username} ({user?.role})
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

export default UserDashboard;
