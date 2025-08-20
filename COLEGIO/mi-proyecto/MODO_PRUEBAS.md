# 🔧 Modo de Pruebas - Autenticación Mock

## 📋 Descripción

Este documento explica cómo usar el sistema de autenticación mock que se ha configurado para permitir pruebas sin necesidad de Supabase.

## 🚀 Cómo Iniciar Sesión

### **Credenciales de Prueba Disponibles:**

| Email                    | Contraseña | Rol           | Descripción                  |
| ------------------------ | ---------- | ------------- | ---------------------------- |
| `estudiante@test.com`    | `123456`   | Estudiante    | Acceso a deportes y jornadas |
| `representante@test.com` | `123456`   | Representante | Gestión de estudiantes       |
| `profesor@test.com`      | `123456`   | Profesor      | Acceso a especialidades      |
| `admin@test.com`         | `123456`   | Administrador | Control total del sistema    |

### **🔑 Información Importante:**

- **Contraseña para todos los usuarios:** `123456`
- **Sistema configurado para modo de pruebas**
- **No se requiere configuración de Supabase**
- **Los datos no se persisten entre recargas**

## 🔐 Funcionalidades Disponibles

### **1. Inicio de Sesión**

- ✅ Login con email y contraseña
- ✅ Validación de credenciales
- ✅ Simulación de delay de red (1 segundo)
- ✅ Mensajes de error apropiados

### **2. Registro de Usuarios**

- ✅ Formulario de registro completo
- ✅ Validación de datos
- ✅ Simulación de creación de cuenta
- ✅ Prevención de usuarios duplicados

### **3. Recuperación de Contraseña**

- ✅ Formulario de "Olvidé mi contraseña"
- ✅ Simulación de envío de email
- ✅ Validación de email existente

### **4. Inicio de Sesión con Google**

- ✅ Botón de login con Google
- ✅ Simulación de autenticación OAuth
- ✅ Usuario mock de Google

### **5. Gestión de Sesión**

- ✅ Cerrar sesión
- ✅ Cambiar contraseña
- ✅ Persistencia de estado de usuario

## 🛠️ Archivos Modificados

### **Archivos Comentados:**

- `src/contexts/AuthContext.jsx` - Contexto de autenticación mock
- `src/lib/supabase.js` - Configuración de Supabase comentada
- `src/lib/authService.js` - Servicio de autenticación mock

### **Archivos Actualizados:**

- `src/App.jsx` - Agregado AuthProvider

## 🧪 Probar el Sistema

### **1. Iniciar el Servidor de Desarrollo:**

```bash
npm run dev
```

### **2. Navegar a la Aplicación:**

- Abrir `http://localhost:5173` en el navegador
- Ir a la página de login

### **3. Probar Diferentes Roles:**

- Usar las credenciales de la tabla anterior
- Probar funcionalidades específicas de cada rol
- Verificar que el dashboard se adapte al rol

### **4. Probar Funcionalidades:**

- ✅ Login/Logout
- ✅ Registro de usuarios
- ✅ Recuperación de contraseña
- ✅ Navegación entre páginas
- ✅ Acceso a deportes
- ✅ Gestión de inscripciones

## 🔍 Logs de Desarrollo

El sistema incluye logs detallados en la consola del navegador:

```javascript
// Ejemplos de logs que verás:
🔧 Mock: Intentando iniciar sesión con: estudiante@test.com
🔧 Mock: Usuario autenticado: {id: "1", email: "estudiante@test.com", ...}
🔧 Mock: Cerrando sesión
🔧 Mock: Registrando usuario: nuevo@test.com
```

## ⚠️ Consideraciones Importantes

### **1. Datos Temporales:**

- Los datos no se persisten entre recargas
- Los usuarios registrados solo existen en memoria
- No hay conexión real con base de datos

### **2. Seguridad:**

- Este modo es solo para desarrollo
- No usar en producción
- Las contraseñas son fijas y conocidas

### **3. Funcionalidades Limitadas:**

- No hay envío real de emails
- No hay autenticación real con Google
- No hay persistencia de datos

## 🔄 Volver a Supabase

Para volver a usar Supabase:

1. **Descomentar archivos:**

   - `src/contexts/AuthContext.jsx` (versión original)
   - `src/lib/supabase.js`
   - `src/lib/authService.js`

2. **Configurar variables de entorno:**

   ```env
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=tu_clave_anonima
   ```

3. **Reiniciar el servidor:**
   ```bash
   npm run dev
   ```

## 📝 Notas de Desarrollo

- El sistema mock simula delays de red para una experiencia realista
- Todos los errores y validaciones funcionan como en el sistema real
- La interfaz de usuario es idéntica al sistema con Supabase
- Los logs ayudan a debuggear el flujo de autenticación

---

**¡Listo para hacer pruebas! 🎉**
