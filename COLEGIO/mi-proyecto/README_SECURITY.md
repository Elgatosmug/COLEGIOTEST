# 🔒 Configuración de Seguridad

## JWT_SECRET Configuration

### Para desarrollo:
```bash
VITE_JWT_SECRET=2f1c2790624feede8eaae2366437a0ceda0493e8be6f2ebe0962e5a874f1b725e11e950b2bda834cdaf95ab899bd7c3517dc5fe91e5fe2aabfa0993621041725
```

### Para producción:
Genera una nueva clave usando:
```bash
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
```

## 🛡️ Medidas de Seguridad Implementadas

### 1. **Protección contra SQL Injection** ✅
- Uso del cliente oficial de Supabase
- Parámetros preparados automáticos
- Sanitización de inputs
- Validación de tipos de datos

### 2. **Autenticación Segura** ✅
- Hash de contraseñas con bcrypt (12 salt rounds)
- JWT tokens con expiración
- Validación de cédula ecuatoriana
- Protección contra fuerza bruta

### 3. **Validación de Inputs** ✅
- Validación de email con regex
- Contraseñas fuertes (mayúsculas, minúsculas, números, caracteres especiales)
- Sanitización de HTML tags
- Validación de cédula ecuatoriana

### 4. **Logs de Seguridad** ✅
- Registro de intentos de login
- Logs de actividad de usuarios
- Bloqueo temporal por intentos fallidos
- Auditoría de cambios de contraseña

## 📋 Pasos de Configuración

### 1. Actualizar .env
```bash
# Agregar a tu archivo .env:
VITE_JWT_SECRET=2f1c2790624feede8eaae2366437a0ceda0493e8be6f2ebe0962e5a874f1b725e11e950b2bda834cdaf95ab899bd7c3517dc5fe91e5fe2aabfa0993621041725
```

### 2. Ejecutar SQL de seguridad en Supabase
Copiar y ejecutar el contenido de `tablas_seguridad.sql` en el SQL Editor de Supabase.

### 3. Verificar instalación de dependencias
```bash
npm install bcryptjs jsonwebtoken
```

## 🔍 Verificación de Seguridad

### Comandos para verificar:
```bash
# Verificar que las dependencias están instaladas
npm list bcryptjs jsonwebtoken

# Verificar que el JWT_SECRET está configurado
echo $VITE_JWT_SECRET
```

## ⚠️ Recomendaciones de Producción

1. **Cambiar JWT_SECRET** en producción
2. **Usar HTTPS** siempre
3. **Configurar CORS** apropiadamente
4. **Implementar rate limiting** adicional
5. **Monitorear logs** de seguridad
6. **Backup regular** de la base de datos

## 🚨 Alertas de Seguridad

- Las contraseñas existentes seguirán funcionando hasta que los usuarios las cambien
- Los nuevos registros usarán hash automáticamente
- Los tokens JWT expiran en 24 horas
- Máximo 5 intentos de login antes del bloqueo (15 minutos) 