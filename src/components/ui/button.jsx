// Button.jsx - Componente base para botones reutilizables

const Button = ({ children, className = "", variant = "default", size = "md", ...props }) => {
  // Puedes personalizar variantes y tamaños aquí
  let variantClasses = "bg-primary text-white hover:bg-primary/80";
  if (variant === "outline") variantClasses = "border border-primary text-primary bg-transparent hover:bg-primary/10";
  if (variant === "hero") variantClasses = "bg-primary text-white shadow-lg hover:bg-primary/90";
  if (variant === "ghost") variantClasses = "bg-transparent hover:bg-primary/10 text-primary";

  let sizeClasses = "px-4 py-2 text-base";
  if (size === "sm") sizeClasses = "px-3 py-1 text-sm";
  if (size === "lg") sizeClasses = "px-6 py-3 text-lg";

  return (
    <button
      className={`rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transform transition-transform hover:scale-105 ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
