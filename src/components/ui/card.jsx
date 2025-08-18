// Card.jsx - Componente base para tarjetas reutilizables

const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-xl border bg-white/5 shadow-md ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div
    className={`p-4  ${className}`}
    {...props}
  >
    {children}
  </div>
);

export { Card, CardContent };
