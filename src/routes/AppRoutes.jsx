import { Routes, Route, Navigate } from 'react-router-dom' 
import { useAuth } from '../contexts/AuthContext' 
import Login from '../components/Login' 
import Dashboard from '../components/Dashboard' 
import ResetPassword from '../components/ResetPassword' 
import Inscripciones from '../components/Inscripciones'// temporal(recordar borrar)
import  InscripcionesAdmin  from '../components/InscripcionesAdmin'//Temporal(Recodar borrar)
import CardContainer from '../components/card-container'
import PaginaDeporte from '../components/paginaDeporte'
import CardContainerAdmin from '../components/card-containerAdmin'
import Principal from '../components/principal/principal';


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

      
      {/* Ruta para dashboard (protegida) */} 
      <Route 
        path="/dashboard" 
        element={user ? <Dashboard /> : <Navigate to="/" replace />} 

      /> 
      
      {/* Ruta para ver todos los deportes */}
      <Route path="/deportes" element={<CardContainer />} />


      {/* Ruta para ver todos los deportes para el admin */}
      <Route path="/deportesadmi" element={<CardContainerAdmin />} />

      {/* Ruta para ver detalles de un deporte específico */}
      <Route path="/deporte/:deporteId" element={<PaginaDeporte />} />
      {/* Ruta para la página principal visual */}
      <Route 
        path="/" 
        element={<Principal />} 
      />
      {/* Ruta para login */}
      <Route 
        path="/login" 
        element={<Login />} 
      />

      {/* Ruta por defecto */} 
      <Route path="*" element={<Navigate to="/" replace />} /> 
      
    </Routes> 
  ) 
} 

export default AppRoutes