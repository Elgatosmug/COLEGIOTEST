

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import "./principal.css";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import FeatureCards from "./FeatureCards";


const Principal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Si el usuario está autenticado, redirigir a su dashboard correspondiente
    if (user) {
      if (user.role === 'administrador') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    }
  }, [user, navigate]);

  // Si no hay usuario, mostrar la página principal
  if (user) {
    return null; // No mostrar nada mientras se redirige
  }

  return (
    <div className="principal-theme min-h-screen">
      <Navigation />
      <HeroSection />
      <FeatureCards />
    </div>
  );
};

export default Principal;
