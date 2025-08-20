import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-12 w-12 md:h-16 md:w-16 object-contain rounded-full shadow" 
            />
            <div className="flex flex-col items-start">
              <div className="text-sm md:text-lg font-bold text-primary tracking-wide uppercase leading-tight" 
                   style={{ letterSpacing: '0.08em', fontFamily: 'inherit' }}>
                Unidad Educativa Fiscal
              </div>
              <div className="text-xl md:text-5xl font-bold text-white leading-tight tracking-tight mt-1" 
                   style={{ letterSpacing: '0.03em', fontFamily: 'inherit' }}>
                Ismael Perez Pazmiño
              </div>
            </div>
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