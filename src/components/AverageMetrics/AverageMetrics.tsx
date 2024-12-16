import React, { useState } from 'react'
import './AverageMetrics.css'

interface AverageMetricsProps {
  averageReward: number
  averageLoss: number
}

const AverageMetrics: React.FC<AverageMetricsProps> = ({
  averageReward,
  averageLoss,
}) => {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-IN').format(value)
  }

  return (
    <div className="average-line-card">
      <div className="line-container">
        <div
          className="line reward-line"
          style={{
            width: `${(averageReward / (averageReward + averageLoss)) * 100}%`,
          }}
          onMouseEnter={() => setHoveredMetric('Average Reward')}
          onMouseLeave={() => setHoveredMetric(null)}
        />
        <div
          className="line loss-line"
          style={{
            width: `${(averageLoss / (averageReward + averageLoss)) * 100}%`,
          }}
          onMouseEnter={() => setHoveredMetric('Average Loss')}
          onMouseLeave={() => setHoveredMetric(null)}
        />
      </div>
      <div className="average-values">
        {hoveredMetric && (
          <div className="hover-value">
            {hoveredMetric === 'Average Reward'
              ? `Average Reward: ${formatNumber(averageReward)}`
              : `Average Loss: ${formatNumber(averageLoss)}`}
          </div>
        )}
      </div>
    </div>
  )
}

export default AverageMetrics
