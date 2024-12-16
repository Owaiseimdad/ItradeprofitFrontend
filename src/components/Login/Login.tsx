import React, { useState } from 'react'
import { auth } from '../../firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom' // Import useNavigate for redirection
import '../../views/Auth.css' // Import the CSS file for styling

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate() // Initialize useNavigate

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // Redirect to dashboard
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <div className="switch-options">
          <div className="switch-title">Don't have account</div>
          <div className="switch-button">
            <button onClick={() => navigate('/sign-up')}>Register</button>
          </div>
        </div>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
