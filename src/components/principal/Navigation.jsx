import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">SISTEMA </div>
            <div className="text-4xl md:text-5xl font-light text-foreground">&</div>
            <div className="text-4xl md:text-5xl font-bold text-primary">DEPORTES</div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button>
                  INICIAR
                </Button>
              </Link>
  
            </div>
          </div>
          <Button variant="ghost" size="sm" className="md:hidden">
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className="w-full h-0.5 bg-foreground"></span>
              <span className="w-full h-0.5 bg-foreground"></span>
              <span className="w-full h-0.5 bg-foreground"></span>
            </div>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
