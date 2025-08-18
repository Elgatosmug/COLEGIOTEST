# Configuración de Supabase

## Pasos para configurar Supabase:

### 1. Crear un proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Espera a que se complete la configuración

### 2. Obtener las credenciales
1. En tu proyecto de Supabase, ve a **Settings** > **API**
2. Copia la **URL** del proyecto
3. Copia la **anon public key**

### 3. Configurar las variables de entorno
1. Crea un archivo `.env` en la raíz del proyecto (al mismo nivel que package.json)
2. Agrega las siguientes líneas:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

### 4. Configurar la base de datos
1. Ve a **SQL Editor** en tu proyecto de Supabase
2. Ejecuta el siguiente SQL para crear la tabla de perfiles:

```sql
-- Crear tabla de perfiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Crear políticas para que los usuarios solo puedan ver/editar su propio perfil
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Crear función para manejar nuevos usuarios
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear trigger para nuevos usuarios
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### 5. Configurar autenticación
1. Ve a **Authentication** > **Settings**
2. En **Site URL**, agrega: `http://localhost:5173` (para desarrollo)
3. En **Redirect URLs**, agrega: `http://localhost:5173/**`

### 6. Reiniciar el servidor
```bash
npm run dev
```

## Solución de problemas:

### Error 400/429:
- Verifica que las variables de entorno estén correctas
- Asegúrate de que el proyecto de Supabase esté activo
- Verifica que las credenciales sean las correctas

### Error de conexión:
- Verifica tu conexión a internet
- Asegúrate de que el proyecto de Supabase no esté en pausa

### Error de autenticación:
- Verifica que las URLs de redirección estén configuradas correctamente
- Asegúrate de que el dominio esté en la lista de permitidos 