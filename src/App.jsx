import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import AppRoutes from './routes/AppRoutes'
import { RegistroProvider } from './contexts/RegistroDeporte'

function AppContent() {
  const { loading } = useAuth()

  return <AppRoutes />
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <RegistroProvider>
          <AppContent />
        </RegistroProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
