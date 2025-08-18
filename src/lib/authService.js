import { supabase } from './supabase'
import { validators } from './validators.js'
import { SECURITY_CONFIG } from './config.js'

// Servicio de autenticación usando Supabase Auth nativo
export const authService = {
  // Iniciar sesión con Google
  async signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      
      if (error) {
        throw new Error('Error al iniciar sesión con Google')
      }
      
      return { data }
    } catch (error) {
      return { error: { message: error.message } }
    }
  },
  // Iniciar sesión usando Supabase Auth
  async signIn(email, password) {
    try {
      // Validar y sanitizar inputs
      const sanitizedEmail = validators.sanitizeEmail(email)
      if (!sanitizedEmail) {
        throw new Error('Credenciales inválidas')
      }

      // Usar Supabase Auth nativo (más seguro)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password: password
      })

      if (error) {
        // Mensaje genérico para no revelar información específica
        throw new Error('Credenciales inválidas')
      }

      // Obtener información adicional del usuario desde nuestra tabla personalizada
      const userInfo = await this.getUserInfo(data.user.id)
      
      const userSession = {
        id: data.user.id,
        email: data.user.email,
        ...userInfo
      }

      return {
        data: {
          user: userSession,
          session: data.session
        }
      }
    } catch (error) {
      return { error: { message: error.message } }
    }
  },

  // Registrar nuevo usuario usando Supabase Auth
  async signUp(email, password, username, cedula, role, additionalData = {}) {
    try {
      // Validar y sanitizar inputs
      const sanitizedEmail = validators.sanitizeEmail(email)
      if (!sanitizedEmail) {
        throw new Error('Email inválido')
      }

      const passwordValidation = validators.isValidPassword(password)
      if (!passwordValidation.valid) {
        throw new Error(passwordValidation.message)
      }

      const sanitizedCedula = validators.sanitizeCedula(cedula)
      if (!sanitizedCedula) {
        throw new Error('Cédula ecuatoriana inválida')
      }

      // Validar rol
      if (!validators.isValidRole(role)) {
        throw new Error('Rol no válido')
      }

      // Validar datos adicionales según el rol
      const roleValidation = validators.validateRoleData(role, additionalData)
      if (!roleValidation.valid) {
        throw new Error(roleValidation.message)
      }

      // Sanitizar inputs
      email = sanitizedEmail
      username = validators.sanitizeInput(username)
      cedula = sanitizedCedula

      // Verificar si el correo ya existe (usando Supabase Auth)
      const { data: existingUser } = await supabase.auth.admin.listUsers()
      const userExists = existingUser.users.some(user => user.email === email)
      
      if (userExists) {
        throw new Error('Error en el proceso de registro')
      }

      // Verificar si el nombre de usuario ya existe
      const { data: existingUsername } = await supabase
        .from('Usuario')
        .select('idUsuario')
        .eq('nombreUsuario', username)
        .single()

      if (existingUsername) {
        throw new Error('Error en el proceso de registro')
      }

      // Verificar si la cédula ya existe
      const { data: existingCedula } = await supabase
        .from('Usuario')
        .select('idUsuario')
        .eq('cedula', cedula)
        .single()

      if (existingCedula) {
        throw new Error('Error en el proceso de registro')
      }

      // Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
            cedula: cedula,
            role: role
          }
        }
      })

      if (authError) {
        throw new Error('Error en el proceso de registro')
      }

      // Insertar datos adicionales en nuestra tabla personalizada
      const { data: newUser, error: insertError } = await supabase
        .from('Usuario')
        .insert([
          {
            idUsuario: authData.user.id, // Usar el ID de Supabase Auth
            Correo: email,
            nombreUsuario: username,
            cedula: cedula,
            fecha_creacion: new Date().toISOString(),
            activo: true
          }
        ])
        .select()
        .single()

      if (insertError) {
        // Si falla, eliminar el usuario de Supabase Auth
        await supabase.auth.admin.deleteUser(authData.user.id)
        throw new Error('Error en el proceso de registro')
      }

      // Crear registro específico según el rol
      let roleError = null

      switch (role) {
        case 'estudiante':
          if (!additionalData.jornada) {
            throw new Error('La jornada es requerida para estudiantes')
          }
          const { error: estError } = await supabase
            .from('Estudiante')
            .insert([
              {
                idJornada: parseInt(additionalData.jornada),
                idRepresentante: additionalData.representante || null,
                idUsuario: authData.user.id
              }
            ])
          roleError = estError
          break

        case 'representante':
          const { error: repError } = await supabase
            .from('Representante_estudiante')
            .insert([
              {
                idUsuario: authData.user.id
              }
            ])
          roleError = repError
          break

        case 'profesor':
          const { error: profError } = await supabase
            .from('Profesor')
            .insert([
              {
                idUsuario: authData.user.id
              }
            ])
          roleError = profError
          break

        case 'administrador':
          const { error: adminError } = await supabase
            .from('Administrador')
            .insert([
              {
                idUsuario: authData.user.id
              }
            ])
          roleError = adminError
          break

        default:
          throw new Error('Rol no válido')
      }

      if (roleError) {
        // Si falla la creación del rol, eliminar el usuario
        await supabase.auth.admin.deleteUser(authData.user.id)
        await supabase
          .from('Usuario')
          .delete()
          .eq('idUsuario', authData.user.id)
        
        throw new Error('Error en el proceso de registro')
      }

      // Obtener información completa del usuario
      const userInfo = await this.getUserInfo(authData.user.id)

      const userSession = {
        id: authData.user.id,
        email: authData.user.email,
        username: username,
        cedula: cedula,
        ...userInfo
      }

      return {
        data: {
          user: userSession,
          session: authData.session,
          message: 'Usuario registrado exitosamente'
        }
      }
    } catch (error) {
      return { error: { message: error.message } }
    }
  },

  // Obtener información adicional del usuario
  async getUserInfo(userId) {
    try {
      // Verificar si es administrador
      const { data: admin } = await supabase
        .from('Administrador')
        .select('IdAdministrador')
        .eq('idUsuario', userId)
        .single()

      if (admin) {
        return { role: 'admin', adminId: admin.IdAdministrador }
      }

      // Verificar si es representante
      const { data: representante } = await supabase
        .from('Representante_estudiante')
        .select(`
          IdRepresentante,
          Estudiante:Estudiante(
            IdEstudiante,
            Usuario:Usuario(nombreUsuario, Correo)
          )
        `)
        .eq('idUsuario', userId)
        .single()

      if (representante) {
        return { 
          role: 'representante', 
          representanteId: representante.IdRepresentante,
          estudiantes: representante.Estudiante || []
        }
      }

      // Verificar si es estudiante
      const { data: estudiante } = await supabase
        .from('Estudiante')
        .select(`
          IdEstudiante,
          idJornada,
          idRepresentante,
          Jornada:Jornada(idJornada, nombre),
          Representante:Representante_estudiante(
            Usuario:Usuario(nombreUsuario, Correo)
          ),
          EstudianteDeporte:EstudianteDeporte(
            IdEstudianteDeporte,
            FechaInscripción,
            es_Inscrito,
            Deporte:Deporte(IdDeporte, nombreDeporte)
          )
        `)
        .eq('idUsuario', userId)
        .single()

      if (estudiante) {
        return { 
          role: 'estudiante', 
          estudianteId: estudiante.IdEstudiante,
          jornada: estudiante.Jornada?.nombre || 'No asignada',
          representante: estudiante.Representante?.Usuario || null,
          deportesInscritos: estudiante.EstudianteDeporte?.filter(ed => ed.es_Inscrito) || []
        }
      }

      // Verificar si es profesor
      const { data: profesor } = await supabase
        .from('Profesor')
        .select('IdProfesor')
        .eq('idUsuario', userId)
        .single()

      if (profesor) {
        return { role: 'profesor', profesorId: profesor.IdProfesor }
      }

      return { role: 'usuario' }
    } catch (error) {
      console.error('Error al obtener información del usuario:', error)
      return { role: 'usuario' }
    }
  },

  // Cerrar sesión usando Supabase Auth
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      return { data: { message: 'Sesión cerrada exitosamente' } }
    } catch (error) {
      return { error: { message: 'Error al cerrar sesión' } }
    }
  },

  // Obtener sesión actual
  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        throw error
      }
      return { data: { session } }
    } catch (error) {
      return { error: { message: 'Error al obtener sesión' } }
    }
  },

  // Cambiar contraseña usando Supabase Auth
  async changePassword(newPassword) {
    try {
      const passwordValidation = validators.isValidPassword(newPassword)
      if (!passwordValidation.valid) {
        throw new Error(passwordValidation.message)
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        throw new Error('Error al cambiar contraseña')
      }

      return { data: { message: 'Contraseña cambiada exitosamente' } }
    } catch (error) {
      return { error: { message: error.message } }
    }
  }
}