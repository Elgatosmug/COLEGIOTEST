// ARCHIVO COMENTADO PARA PRUEBAS SIN SUPABASE
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY

// // Verificar que las variables de entorno estén configuradas
// if (!supabaseUrl || !supabaseAnonKey) {
//   console.error('❌ Error: Las variables de entorno de Supabase no están configuradas.')
//   console.error('Por favor, crea un archivo .env en la raíz del proyecto con:')
//   console.error('VITE_SUPABASE_URL=tu_url_de_supabase')
//   console.error('VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=tu_clave_anonima_de_supabase')
// }

// // Crear el cliente de Supabase
// export const supabase = createClient(
//   supabaseUrl || 'https://placeholder.supabase.co',
//   supabaseAnonKey || 'placeholder_key',
//   {
//     auth: {
//       autoRefreshToken: true,
//       persistSession: true,
//       detectSessionInUrl: true
//     }
//   }
// )

// Cliente mock para evitar errores de importación
export const supabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    resetPasswordForEmail: () => Promise.resolve({ error: null }),
    signOut: () => Promise.resolve({ error: null })
  }
} 