

import "./principal.css";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import FeatureCards from "./FeatureCards";


const Principal = () => {
  return (
    <div className="principal-theme min-h-screen">
      <Navigation />
      <HeroSection />
      <FeatureCards />
    </div>
  );
};

export default Principal;
