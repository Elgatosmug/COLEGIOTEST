# 🚀 Instrucciones Rápidas para Pruebas

## ✅ Configuración Completada

He configurado tu proyecto para funcionar **sin Supabase** en modo de pruebas. Todo está listo para que puedas hacer pruebas sin problemas de autenticación.

## 🎯 Cómo Iniciar las Pruebas

### **Opción 1: Script Automático (Recomendado)**

```bash
# En Windows:
INICIAR_PRUEBAS.bat

# En Linux/Mac:
./INICIAR_PRUEBAS.sh
```

### **Opción 2: Comando Manual**

```bash
cd COLEGIOTEST
npm run dev
```

## 🔑 Credenciales de Prueba

| Usuario       | Email                    | Contraseña | Rol           |
| ------------- | ------------------------ | ---------- | ------------- |
| Estudiante    | `estudiante@test.com`    | `123456`   | Estudiante    |
| Representante | `representante@test.com` | `123456`   | Representante |
| Profesor      | `profesor@test.com`      | `123456`   | Profesor      |
| Administrador | `admin@test.com`         | `123456`   | Administrador |

## 🌐 Acceso a la Aplicación

1. **Abrir navegador:** `http://localhost:5173`
2. **Ir a login:** Hacer clic en "Iniciar Sesión"
3. **Usar credenciales:** De la tabla anterior
4. **¡Listo!** Ya puedes probar todas las funcionalidades

## 🔧 Funcionalidades Disponibles

### ✅ **Autenticación:**

- Login con email/contraseña
- Registro de nuevos usuarios
- Recuperación de contraseña
- Login con Google (simulado)
- Cerrar sesión

### ✅ **Gestión de Roles:**

- Diferentes dashboards por rol
- Acceso específico a funcionalidades
- Validación de permisos

### ✅ **Deportes:**

- Ver catálogo de deportes
- Detalles de cada deporte
- Categorías y fechas
- Sistema de inscripciones

### ✅ **Interfaz:**

- Diseño responsive
- Navegación intuitiva
- Mensajes de error/éxito
- Loading states

## 🛠️ Archivos Modificados

### **Comentados (Supabase):**

- `src/contexts/AuthContext.jsx` - Versión original comentada
- `src/lib/supabase.js` - Configuración de Supabase
- `src/lib/authService.js` - Servicio original comentado

### **Creados/Actualizados:**

- `src/contexts/AuthContext.jsx` - Contexto mock para pruebas
- `src/lib/authService.js` - Servicio mock
- `src/lib/config.js` - Configuración centralizada
- `src/App.jsx` - Agregado AuthProvider
- `MODO_PRUEBAS.md` - Documentación completa
- `INICIAR_PRUEBAS.bat/.sh` - Scripts de inicio

## 🔍 Logs de Desarrollo

Abre la **Consola del Navegador** (F12) para ver logs detallados:

```javascript
🔧 Mock: Intentando iniciar sesión con: estudiante@test.com
🔧 Mock: Usuario autenticado: {id: "1", email: "estudiante@test.com", ...}
🔧 Mock: Cerrando sesión
```

## ⚠️ Notas Importantes

1. **Datos Temporales:** Los datos no se guardan entre recargas
2. **Solo Desarrollo:** Este modo es solo para pruebas
3. **Sin Emails Reales:** La recuperación de contraseña es simulada
4. **Sin Google Real:** El login con Google es simulado

## 🔄 Volver a Supabase (Cuando Quieras)

Para volver a usar Supabase:

1. **Descomentar archivos originales**
2. **Configurar variables de entorno**
3. **Reiniciar servidor**

Ver `MODO_PRUEBAS.md` para instrucciones detalladas.

## 🎉 ¡Listo para Probar!

Tu sistema está completamente configurado para pruebas sin Supabase. Puedes:

- ✅ Probar todos los roles de usuario
- ✅ Navegar por todas las funcionalidades
- ✅ Verificar la interfaz de usuario
- ✅ Probar el flujo de autenticación
- ✅ Validar la experiencia de usuario

**¡Disfruta probando tu plataforma! 🚀**

