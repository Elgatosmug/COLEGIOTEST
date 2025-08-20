import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DevAuthProvider } from './contexts/DevAuthContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DevAuthProvider>
      
      <App />
    </DevAuthProvider>
  </StrictMode>
)
