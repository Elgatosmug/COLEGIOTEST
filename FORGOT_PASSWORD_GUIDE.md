# 🔐 Guía de Funcionalidad "Olvidé mi Contraseña"

## 📋 Descripción General

La funcionalidad de "Olvidé mi contraseña" permite a los usuarios restablecer su contraseña de forma segura a través de un enlace enviado por correo electrónico.

## 🛡️ Características de Seguridad

### ✅ **Seguridad Implementada:**
- **Enlaces temporales**: Los enlaces de restablecimiento expiran automáticamente
- **Validación de contraseñas**: Requisitos de contraseña fuerte
- **Mensajes genéricos**: No revelan información específica sobre cuentas
- **Autenticación de tokens**: Verificación de tokens de acceso y refresh
- **Redirección automática**: Redirección al login después del restablecimiento

### 🔒 **Protecciones:**
- **Contra ataques de enumeración**: Mensajes genéricos para emails no registrados
- **Contra ataques de fuerza bruta**: Rate limiting en Supabase
- **Contra enlaces expirados**: Validación automática de tokens
- **Contra contraseñas débiles**: Validación robusta de fortaleza

## 🔄 Flujo de Funcionamiento

### 1. **Solicitud de Restablecimiento**
```
Usuario → Hace clic en "¿Olvidaste tu contraseña?"
         → Ingresa su email
         → Sistema envía enlace por correo
```

### 2. **Procesamiento del Enlace**
```
Usuario → Hace clic en enlace del correo
         → Sistema valida tokens
         → Redirige a formulario de nueva contraseña
```

### 3. **Restablecimiento de Contraseña**
```
Usuario → Ingresa nueva contraseña
         → Sistema valida fortaleza
         → Actualiza contraseña en Supabase
         → Redirige al login
```

## 📧 Configuración de Correo

### **Supabase Auth Configuration:**
```javascript
// En Supabase Dashboard > Authentication > Settings
{
  "site_url": "http://localhost:5173",
  "redirect_urls": [
    "http://localhost:5173/reset-password",
    "https://tu-dominio.com/reset-password"
  ]
}
```

### **Plantilla de Correo Personalizable:**
- **Asunto**: "Restablecer tu contraseña - Plataforma Deportes"
- **Contenido**: Incluye enlace seguro y instrucciones
- **Diseño**: Responsive y profesional

## 🎨 Componentes de la Interfaz

### **1. Formulario de Solicitud (`Login.jsx`)**
- Campo de email
- Validación en tiempo real
- Mensajes de error/éxito
- Botón de envío con estado de carga

### **2. Formulario de Restablecimiento (`ResetPassword.jsx`)**
- Campo de nueva contraseña
- Campo de confirmación
- Indicadores de fortaleza
- Requisitos visuales
- Botones de mostrar/ocultar contraseña

## 🔧 Configuración Técnica

### **Rutas Configuradas:**
```javascript
// App.jsx
<Route path="/reset-password" element={<ResetPassword />} />
```

### **Validaciones Implementadas:**
```javascript
// validators.js
isValidPassword(password) // Validación de fortaleza
sanitizeEmail(email)      // Sanitización de email
```

### **Integración con Supabase:**
```javascript
// AuthContext.jsx
resetPassword(email) // Envía enlace de restablecimiento
updateUser(password) // Actualiza contraseña
```

## 📱 Experiencia de Usuario

### **Estados de la Interfaz:**
1. **Estado inicial**: Formulario limpio
2. **Estado de carga**: Indicadores de progreso
3. **Estado de error**: Mensajes claros y útiles
4. **Estado de éxito**: Confirmación y redirección

### **Mensajes de Usuario:**
- ✅ **Éxito**: "Se ha enviado un enlace de recuperación a tu correo electrónico"
- ❌ **Error**: "Error en el proceso de recuperación" (genérico)
- ⚠️ **Validación**: "Las contraseñas no coinciden"

## 🚀 Próximos Pasos Recomendados

### **Mejoras de Seguridad:**
1. **Rate Limiting**: Implementar límites de solicitudes por IP
2. **Logs de Auditoría**: Registrar intentos de restablecimiento
3. **Notificaciones**: Alertar sobre restablecimientos exitosos
4. **Expiración Configurable**: Permitir ajustar tiempo de expiración

### **Mejoras de UX:**
1. **Indicador de Fortaleza**: Barra visual de fortaleza de contraseña
2. **Autocompletado**: Sugerencias de contraseñas seguras
3. **Múltiples Métodos**: SMS como alternativa al email
4. **Recordatorio**: Notificar antes de expiración del enlace

## 🔍 Troubleshooting

### **Problemas Comunes:**

#### **1. Enlace no funciona**
- Verificar configuración de URLs en Supabase
- Comprobar que el enlace no haya expirado
- Revisar logs de Supabase para errores

#### **2. Correo no llega**
- Verificar carpeta de spam
- Comprobar configuración de SMTP en Supabase
- Revisar logs de envío de correos

#### **3. Error de validación**
- Verificar requisitos de contraseña
- Comprobar que las contraseñas coincidan
- Revisar validaciones en el frontend

### **Logs Útiles:**
```javascript
// En la consola del navegador
console.log('Reset password attempt:', email)
console.log('Token validation:', accessToken)
console.log('Password update result:', result)
```

## 📚 Recursos Adicionales

- [Documentación de Supabase Auth](https://supabase.com/docs/guides/auth)
- [Mejores Prácticas de Seguridad](https://owasp.org/www-project-top-ten/)
- [Guías de UX para Recuperación de Contraseñas](https://www.nngroup.com/articles/password-reset/)

---

**Nota**: Esta funcionalidad está completamente integrada con Supabase Auth y sigue las mejores prácticas de seguridad para restablecimiento de contraseñas. 