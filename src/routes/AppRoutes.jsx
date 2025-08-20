import { Routes, Route, Navigate } from 'react-router-dom' 
import { useAuth } from '../contexts/AuthContext' 
import Login from '../components/Login' 
import Dashboard from '../components/Dashboard' 
import ResetPassword from '../components/ResetPassword' 
import Inscripciones from '../components/Inscripciones'
import InscripcionesAdmin from '../components/InscripcionesAdmin'
import CardContainer from '../components/card-container'
import PaginaDeporte from '../components/paginaDeporte'
import CardContainerAdmin from '../components/card-containerAdmin'
import Principal from '../components/principal/principal';
import Navigation from '../components/principal/Navigation'
import Navitem from '../components/Navitem'
import UserDashboard from '../components/UserDashboard'
import AdminDashboard from '../components/AdminDashboard'

function AppRoutes() { 
  const { user } = useAuth() 

  return ( 
    <Routes> 
      {/* Ruta para restablecer contraseña (accesible sin autenticación) */} 
      <Route path="/reset-password" element={<ResetPassword />} /> 
      {/* Ruta temporal para desarrollo - Inscripciones */}
       <Route path="/inscripciones" element={<Inscripciones />} />
      {/* Ruta temporal para desarrollo - InscripcionesAdmin */}
       <Route path="/inscripcionesAdmin" element={<InscripcionesAdmin />} />
      {/* Ruta principal - redirige según autenticación */} 

      
      {/* Rutas para dashboards según rol */}
      <Route 
        path="/user-dashboard" 
        element={user && user.role !== 'administrador' ? <UserDashboard /> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/admin-dashboard" 
        element={user && user.role === 'administrador' ? <AdminDashboard /> : <Navigate to="/login" replace />} 
      />
      
      {/* Ruta para dashboard (protegida) - mantener para compatibilidad */}
      <Route 
        path="/dashboard" 
        element={user ? <Dashboard /> : <Navigate to="/" replace />} 
      /> 
      
      {/* Rutas para deportes (mantener para compatibilidad si es necesario) */}
      <Route path="/deportes" element={<CardContainer />} />
      <Route path="/deportesadmi" element={<CardContainerAdmin />} />
      <Route path="/deporte/:deporteId" element={<PaginaDeporte />} />
      
      {/* Ruta para la página principal visual */}
      <Route 
        path="/" 
        element={user ? (
          user.role === 'administrador' ? 
            <Navigate to="/admin-dashboard" replace /> : 
            <Navigate to="/user-dashboard" replace />
        ) : (
          <Principal />
        )} 
      />
      
      {/* Ruta para login */}
      <Route 
        path="/login" 
        element={<Login />} 
      />

      {/* Ruta por defecto */} 
      <Route path="*" element={<Navigate to="/" replace />} /> 


      {/* Ruta para ver detalles de un deporte específico */}
      <Route path="/deporte/main" element={<Navitem />} />
      
    </Routes> 
  ) 
} 

export default AppRoutes