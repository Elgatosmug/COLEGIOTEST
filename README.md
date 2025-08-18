# 🏫 Plataforma Deportes - Unidad Educativa Fiscal Ismael Perez Pazmiño

## 📋 Descripción

Sistema de gestión deportiva para la Unidad Educativa Fiscal Ismael Perez Pazmiño, con autenticación segura, gestión de roles y funcionalidad de recuperación de contraseñas.

## 🚀 Características Principales

### 🔐 **Autenticación Segura**
- ✅ Login/Registro con validaciones robustas
- ✅ Recuperación de contraseñas por email
- ✅ Validación de cédula ecuatoriana
- ✅ Contraseñas fuertes con requisitos específicos
- ✅ Protección contra SQL Injection y XSS

### 👥 **Gestión de Roles**
- **Estudiante**: Acceso a deportes y jornadas
- **Representante**: Gestión de estudiantes
- **Profesor**: Acceso a especialidades
- **Administrador**: Control total del sistema

### 🛡️ **Seguridad Avanzada**
- Arquitectura sin secrets en frontend
- JWT manejado por Supabase Auth
- Mensajes de error genéricos
- Sanitización de inputs
- Validaciones robustas

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd mi-proyecto

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase
```

## 🔧 Configuración

### Variables de Entorno (.env)
```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=tu_clave_publica_de_supabase
```

### Configuración de Supabase
1. **Authentication > Settings > URL Configuration**:
   ```
   Site URL: http://localhost:5173
   Redirect URLs: http://localhost:5173/reset-password
   ```

2. **Authentication > Email Templates**:
   - Personalizar plantilla de "Reset Password"

## 🚀 Comandos Disponibles

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

### Testing
```bash
# Ejecutar pruebas de validadores
npm test

# Ejecutar pruebas de validadores (alias)
npm run test:validators
```

### Linting
```bash
# Verificar código
npm run lint
```

## 🧪 Pruebas

El sistema incluye pruebas automatizadas para validar:

- ✅ **Sanitización de emails** (protección contra SQL injection)
- ✅ **Validación de cédulas** ecuatorianas
- ✅ **Fortaleza de contraseñas** (8+ chars, mayúsculas, minúsculas, números, especiales)
- ✅ **Sanitización general** de inputs
- ✅ **Validación de roles** (case-insensitive)
- ✅ **Validación de datos** específicos por rol

### Ejecutar Pruebas
```bash
npm test
```

## 🔐 Funcionalidad "Olvidé mi Contraseña"

### Flujo de Uso:
1. **Usuario hace clic** en "¿Olvidaste tu contraseña?"
2. **Ingresa su email** en el formulario de recuperación
3. **Recibe correo** con enlace de restablecimiento
4. **Hace clic en el enlace** del correo
5. **Establece nueva contraseña** con validaciones
6. **Es redirigido** automáticamente al login

### Características de Seguridad:
- Enlaces temporales que expiran automáticamente
- Validación de tokens de acceso y refresh
- Mensajes genéricos para evitar ataques de enumeración
- Validación robusta de contraseñas
- Redirección automática al login

## 📁 Estructura del Proyecto

```
mi-proyecto/
├── src/
│   ├── components/
│   │   ├── Login.jsx              # Formulario de login con recuperación
│   │   ├── ResetPassword.jsx      # Página de restablecimiento
│   │   ├── Dashboard.jsx          # Panel principal
│   │   ├── RoleSelection.jsx      # Selección de rol
│   │   ├── RegisterForm.jsx       # Formulario de registro
│   │   ├── Header.jsx             # Encabezado reutilizable
│   │   └── Footer.jsx             # Pie de página reutilizable
│   ├── contexts/
│   │   └── AuthContext.jsx        # Contexto de autenticación
│   ├── lib/
│   │   ├── supabase.js            # Configuración de Supabase
│   │   ├── authService.js         # Servicio de autenticación
│   │   ├── validators.js          # Validaciones y sanitización
│   │   ├── securityUtils.js       # Utilidades de seguridad
│   │   └── config.js              # Configuración centralizada
│   └── App.jsx                    # Componente principal con rutas
├── public/
│   ├── logo.jpg                   # Logo de la institución
│   └── aula.webp                  # Imagen de fondo
├── test_validators.js             # Pruebas de validadores
├── FORGOT_PASSWORD_GUIDE.md       # Guía de recuperación de contraseñas
└── package.json                   # Dependencias y scripts
```

## 🛡️ Arquitectura de Seguridad

### Frontend (Cliente)
- ✅ Validaciones de entrada
- ✅ Sanitización de datos
- ✅ Interfaz de usuario
- ✅ Sin secrets expuestos

### Backend (Supabase)
- ✅ Autenticación JWT
- ✅ Hash de contraseñas
- ✅ Rate limiting
- ✅ Gestión de sesiones

## 🔍 Troubleshooting

### Problemas Comunes

#### **1. Error de conexión a Supabase**
- Verificar variables de entorno en `.env`
- Comprobar credenciales en Supabase Dashboard
- Verificar conectividad de red

#### **2. Error en recuperación de contraseña**
- Verificar configuración de URLs en Supabase
- Comprobar plantillas de correo
- Revisar logs de Supabase

#### **3. Error de validación**
- Ejecutar `npm test` para verificar validadores
- Revisar requisitos de contraseña
- Comprobar formato de cédula

### Logs Útiles
```bash
# Verificar configuración
npm test

# Ver logs de desarrollo
npm run dev
```

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de Recuperación de Contraseñas](./FORGOT_PASSWORD_GUIDE.md)
- [Mejores Prácticas de Seguridad](https://owasp.org/www-project-top-ten/)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado para la Unidad Educativa Fiscal Ismael Perez Pazmiño** 🏫⚽
