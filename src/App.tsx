import './App.css'
import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import NavBar from './components/Navigation/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './pages/Dashboard'
import Journals from './pages/Journals'
import Calendar from './pages/Calendar'
import useFileUpload from './hooks/useFileUpload'
import Login from './components/Login/Login'
import Registration from './components/Registration/Registration'
import { AuthProvider, useAuth } from './auth/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home' // Import Home component
import Loading from './components/Loading/Loading'

const App: React.FC = () => {
  const {
    validData,
    invalidData,
    handleSubmit,
    message,
    resetData,
  } = useFileUpload()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (user && localStorage.getItem('user_uuid') !== user.uid) {
      localStorage.setItem('user_uuid', user.uid)
      resetData()
    }
  }, [user, resetData])

  const handleUpload = async (file: File | null) => {
    const userUid = user.uid
    if (file && userUid) {
      await handleSubmit(file, userUid)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <AuthProvider>
      <div className="body">
        {user && (
          <div className="navbar">
            <NavBar onUpload={handleUpload} />
          </div>
        )}
        <div className="pages">
          {message && <div className="alert alert-info">{message}</div>}
          <Routes>
            <Route
              path="/sign-in"
              element={user ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route
              path="/sign-up"
              element={user ? <Navigate to="/dashboard" /> : <Registration />}
            />
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" /> : <Home />} // Redirect to dashboard if logged in
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    uploadedData={validData}
                    invalidData={invalidData}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-journals"
              element={
                <ProtectedRoute>
                  <Journals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  )
}

export default App
