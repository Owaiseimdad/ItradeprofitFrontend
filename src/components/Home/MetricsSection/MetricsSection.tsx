// src/components/MetricsSection/MetricsSection.tsx
import React from 'react'
import './MetricsSection.css'

const MetricsSection: React.FC = () => {
  return (
    <div className="home-metrics-section">
      <h2>Why Traders Lose Money</h2>
      <p>
        Statistics show that around 70-90% of retail traders lose money. Common
        reasons include:
      </p>
      <ul>
        <li>Over-leveraging</li>
        <li>Lack of proper analysis</li>
        <li>Emotional trading</li>
      </ul>
    </div>
  )
}

export default MetricsSection
