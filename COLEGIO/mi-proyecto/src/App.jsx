import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import AppRoutes from './routes/AppRoutes'
import { RegistroProvider } from './contexts/RegistroDeporte'
import { PostProvider } from './contexts/PostContext'

function AppContent() {
  const { loading } = useAuth()

  return <AppRoutes />
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <RegistroProvider>
          <PostProvider>
            <AppContent />
          </PostProvider>
        </RegistroProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
