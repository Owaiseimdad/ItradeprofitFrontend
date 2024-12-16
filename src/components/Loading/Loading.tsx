import React from 'react'
import './Loading.css' // Create a CSS file for loading styles

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  )
}

export default Loading
