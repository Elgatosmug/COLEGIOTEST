// Servicio de autenticación mock para desarrollo/testing
// NO USAR EN PRODUCCIÓN

export const mockAuthService = {
  // Usuarios mock predefinidos
  mockUsers: [
    {
      id: 'mock-admin-001',
      email: 'admin@test.com',
      password: 'admin123',
      username: 'AdminTest',
      role: 'administrador',
      cedula: '1234567890',
      activo: true
    },
    {
      id: 'mock-prof-001',
      email: 'profesor@test.com',
      password: 'prof123',
      username: 'ProfTest',
      role: 'profesor',
      cedula: '0987654321',
      activo: true
    },
    {
      id: 'mock-est-001',
      email: 'estudiante@test.com',
      password: 'est123',
      username: 'EstTest',
      role: 'estudiante',
      cedula: '1122334455',
      activo: true
    },
    {
      id: 'mock-rep-001',
      email: 'representante@test.com',
      password: 'rep123',
      username: 'RepTest',
      role: 'representante',
      cedula: '5544332211',
      activo: true
    }
  ],

  // Simular inicio de sesión
  async signIn(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
          const mockSession = {
            user: {
              id: user.id,
              email: user.email,
              user_metadata: {
                username: user.username,
                role: user.role,
                cedula: user.cedula
              }
            },
            access_token: `mock-jwt-${user.id}`,
            refresh_token: `mock-refresh-${user.id}`,
            expires_in: 3600
          };
          
          resolve({ data: { user: mockSession.user, session: mockSession }, error: null });
        } else {
          resolve({ data: null, error: { message: 'Credenciales inválidas' } });
        }
      }, 500); // Simular delay de red
    });
  },

  // Simular registro
  async signUp(email, password, username, cedula, role, additionalData = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Verificar si el email ya existe
        if (this.mockUsers.some(u => u.email === email)) {
          resolve({ data: null, error: { message: 'El correo ya está registrado' } });
          return;
        }

        const newUser = {
          id: `mock-${Date.now()}`,
          email,
          password,
          username,
          role,
          cedula,
          activo: true,
          ...additionalData
        };

        this.mockUsers.push(newUser);

        const mockSession = {
          user: {
            id: newUser.id,
            email: newUser.email,
            user_metadata: {
              username: newUser.username,
              role: newUser.role,
              cedula: newUser.cedula
            }
          },
          access_token: `mock-jwt-${newUser.id}`,
          refresh_token: `mock-refresh-${newUser.id}`,
          expires_in: 3600
        };

        resolve({ data: { user: mockSession.user, session: mockSession }, error: null });
      }, 800);
    });
  },

  // Simular cierre de sesión
  async signOut() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Sesión cerrada exitosamente' }, error: null });
      }, 200);
    });
  },

  // Simular inicio de sesión con Google
  async signInWithGoogle() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const googleUser = this.mockUsers[0]; // Usar el admin como usuario de Google
        const mockSession = {
          user: {
            id: googleUser.id,
            email: googleUser.email,
            user_metadata: {
              username: googleUser.username,
              role: googleUser.role,
              cedula: googleUser.cedula,
              provider: 'google'
            }
          },
          access_token: `mock-google-jwt-${googleUser.id}`,
          refresh_token: `mock-google-refresh-${googleUser.id}`,
          expires_in: 3600
        };
        
        resolve({ data: { user: mockSession.user, session: mockSession }, error: null });
      }, 1000);
    });
  },

  // Simular restablecimiento de contraseña
  async resetPassword(email) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.mockUsers.find(u => u.email === email);
        if (user) {
          resolve({ 
            data: { 
              message: 'Se ha enviado un enlace de recuperación a tu correo' 
            }, 
            error: null 
          });
        } else {
          resolve({ 
            data: null, 
            error: { message: 'Correo no encontrado' } 
          });
        }
      }, 1500);
    });
  },

  // Simular obtención de información del usuario
  async getUserInfo(userId) {
    const user = this.mockUsers.find(u => u.id === userId);
    if (user) {
      return {
        username: user.username,
        role: user.role,
        cedula: user.cedula,
        activo: user.activo
      };
    }
    return { role: 'usuario' };
  }
};

// Función para verificar si estamos en modo desarrollo
export const isDevelopmentMode = () => {
  return import.meta.env?.MODE === 'development' || process.env.NODE_ENV === 'development';
};
