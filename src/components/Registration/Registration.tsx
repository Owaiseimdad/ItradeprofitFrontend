import React, { useState } from 'react'
import { auth } from '../../firebase/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import '../../views/Auth.css'

const Registration: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('') // State for display name
  const navigate = useNavigate()

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const user = userCredential.user

      // Update the user's profile with the display name
      await updateProfile(user, { displayName })

      // Optionally, redirect to dashboard or another page
      navigate('/dashboard') // Redirect to the dashboard after registration
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        <div className="switch-options">
          <div className="switch-title">Already have an account</div>
          <div className="switch-button">
            <button onClick={() => navigate('/sign-in')}>Sign in</button>
          </div>
        </div>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Registration
