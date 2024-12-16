import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App' // No need for .tsx extension
import reportWebVitals from './reportWebVitals'
import { AuthProvider } from './auth/AuthContext' // Import the AuthProvider

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </React.StrictMode>,
  )
}

reportWebVitals()
