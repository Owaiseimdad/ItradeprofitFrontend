import React from 'react'
import './Metrics.css'
import { MetricsProps } from './MetricsPropsInterface'
import AverageMetrics from '../AverageMetrics/AverageMetrics'

const Metrics: React.FC<MetricsProps> = ({ metrics }) => {
  const formatNumber = (value: string | number) => {
    if (typeof value == 'string') {
      return value
    }
    return new Intl.NumberFormat('en-IN').format(value)
  }

  const averageReward = 2000 // Replace with actual average reward value
  const averageLoss = 500 // Replace with actual average loss value

  return (
    <section className="overview-section">
      <h4 className="overview-title">Overview</h4>
      <div className="card-container">
        {metrics.map((metric, index) => (
          <div key={index} className="card">
            <h3>{metric.title}</h3>
            <p>{formatNumber(metric.value)}</p>
            <div className="tooltip">{metric.description}</div>
          </div>
        ))}
        <div className="card">
          <h3>Average Profit / Loss</h3>
          <AverageMetrics
            averageReward={averageReward}
            averageLoss={averageLoss}
          />
        </div>
      </div>
    </section>
  )
}

export default Metrics
