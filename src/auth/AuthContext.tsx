import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase/firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { AppUser } from '../types/AppUser'
import { handleUserAddition } from './userutils'

interface AuthContextType {
  user: AppUser
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null) // Replace with your user state
  const [loading, setLoading] = useState(true) // Initialize loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        await handleUserAddition(user)
      } else {
        setUser(null) // Ensure user is null when logged out
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
