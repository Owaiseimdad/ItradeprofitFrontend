import React from 'react'
import { Link } from 'react-router-dom'
import './CallToAction.css'

const CallToAction: React.FC = () => {
  return (
    <div className="cta-section">
      <h2>Ready to Start Trading Smarter?</h2>
      <Link to="/sign-up" className="cta-button">
        Sign Up
      </Link>
      <Link to="/sign-in" className="cta-button">
        Login
      </Link>
    </div>
  )
}

export default CallToAction
