import { metricsConfig } from './metricsConfigArray'
import { Data } from '../types/Trade'

export const calculateMetrics = (data: Data | null) => {
  if (!data) {
    return metricsConfig.map((metric) => ({
      title: metric.title,
      value: 0,
      description: metric.description,
    }))
  }

  return metricsConfig.map((metric) => {
    const result = metric.calculate(data)
    return {
      title: metric.title,
      value: parseFloat(result.value.toFixed(2)),
      description: metric.description,
    }
  })
}
