import { useState, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
{/* ajustar los links con las rotas de app routes */}
const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Deportes', href: '/deportesadmi' },
  { label: 'Inscripciones', href: '/inscripciones' },
];

const Navitem = () => {
  const [hoverPosition, setHoverPosition] = useState({ x: 0, width: 0, opacity: 0 });
  const navRef = useRef(null);

  const handleMouseEnter = (event) => {
    const button = event.currentTarget;
    const nav = navRef.current;
    
    if (nav) {
      const navRect = nav.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      
      setHoverPosition({
        x: buttonRect.left - navRect.left,
        width: buttonRect.width,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoverPosition(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      <nav 
        ref={navRef}
        className="relative bg-nav-bg rounded-full p-1.5 shadow-2xl backdrop-blur-sm border border-white/20"
        style={{ filter: 'drop-shadow(var(--shadow-glow))' }}
        onMouseLeave={handleMouseLeave}
      >
        
        <div
          className="absolute top-1.5 h-[calc(100%-0.75rem)] bg-nav-hover rounded-full transition-all duration-300 ease-out"
          style={{
            left: `${hoverPosition.x}px`,
            width: `${hoverPosition.width}px`,
            opacity: hoverPosition.opacity,
            transform: 'translateZ(0)', 
          }}
        />
        
        
        <div className="relative flex items-center gap-1">
          {navItems.map((item, index) => (
            <button
              key={index}
              onMouseEnter={handleMouseEnter}
              className="relative z-10 px-8 py-3 text-nav-text font-medium text-sm rounded-full transition-all duration-300 ease-out hover:text-nav-text-hover hover:scale-105 active:scale-95"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navitem;